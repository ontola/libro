import Stream from 'stream';

import { INTERNAL_SERVER_ERROR, SERVICE_UNAVAILABLE } from 'http-status-codes';

import * as constants from '../../app/config';
import { isHTMLHeader } from '../utils/http';
import logging from '../utils/logging';
import manifest from '../utils/manifest';
import {
  bulkResourceRequest,
  isRedirect,
  route,
} from '../utils/proxies/helpers';
import { handleRender } from '../utils/render';

const BACKEND_TIMEOUT = 3000;

export default function application(port) {
  const PRELOAD_HEADERS = [
    `<${constants.ASSETS_HOST}/static/preloader.css>; rel=preload; as=style`,
    manifest['main.js'] && `<${constants.ASSETS_HOST}${manifest['main.js']}>; rel=preload; as=script`,
    __PRODUCTION__ && manifest['main.css'] && `<${constants.ASSETS_HOST}${manifest['main.css']}>; rel=preload; as=style`,
  ].filter(Boolean);

  const sendResponse = (req, res, domain, websiteMeta, data) => {
    if (isHTMLHeader(req.headers)) {
      res.setHeader('Link', PRELOAD_HEADERS);
    }
    res.setHeader('Vary', 'Accept,Accept-Encoding,Authorization,Content-Type');
    handleRender(req, res, port, domain, websiteMeta, data);

    return undefined;
  };

  return (req, res) => {
    const domain = req.get('host').replace(/:.*/, '');
    Promise.race([
      req.api.headRequest(req),
      new Promise((_, reject) => setTimeout(reject, BACKEND_TIMEOUT)),
    ]).then((serverRes) => {
      res.status(serverRes.status);
      if (isRedirect(serverRes.status)) {
        const location = serverRes.headers.get('Location');
        if (!location) {
          // TODO: bugsnag
        }

        res.set('Location', location);
        return res.end();
      }

      const websiteMetaHeader = serverRes.headers.get('Website-Meta');
      if (!websiteMetaHeader) {
        throw new Error('No Website-Meta header in response');
      }
      const websiteMetaParams = new URLSearchParams(websiteMetaHeader);
      const websiteMeta = {
        cssClass: websiteMetaParams.get('css_class'),
        primaryMain: websiteMetaParams.get('navbar_background'),
        primaryText: websiteMetaParams.get('navbar_color'),
        secondaryMain: websiteMetaParams.get('accent_background_color'),
        secondaryText: websiteMetaParams.get('accent_color'),
        title: websiteMetaParams.get('application_name') || 'Argu',
        website: websiteMetaParams.get('iri'),
      };

      if (!websiteMeta.website) {
        throw new Error(`No website iri in head, got status '${serverRes.status}' and header '${websiteMetaHeader}'`);
      }

      let responseData = Buffer.alloc(0);
      const responseStream = new Stream.Writable();
      // eslint-disable-next-line no-underscore-dangle
      responseStream._write = (chunk, encoding, next) => {
        responseData = Buffer.concat([responseData, chunk]);
        next();
      };
      const dataHeaders = {
        ...req.headers,
        accept: 'application/n-quads',
      };
      const reqForData = {
        api: req.api,
        deviceId: req.deviceId,
        headers: dataHeaders,
        session: req.session,
        status: 200,
      };
      const resources = [
        `${websiteMeta.website}`,
        `${websiteMeta.website}/ns/core`,
        `${websiteMeta.website}/c_a`,
        `${websiteMeta.website}/n`,
        `${websiteMeta.website}/search`,
        `${websiteMeta.website}/menus`,
        `${websiteMeta.website}/apex/menus`,
      ];
      if (req.path?.length > 1) {
        const { origin } = new URL(websiteMeta.website);
        resources.unshift(origin + req.path);
      }

      return Promise
        .all(resources
          .reduce((acc, iri) => (acc.includes(iri) ? acc : acc.concat(iri)), [])
          .map(iri => bulkResourceRequest(reqForData, iri, route(iri, true), responseStream)))
        .then(() => sendResponse(req, res, domain, websiteMeta, responseData));
    }).catch((e) => {
      if (typeof e === 'undefined') {
        // Timeout finished first
        res.status(SERVICE_UNAVAILABLE);
      } else {
        logging.error(e, req.bugsnag ? 'Notifying' : 'Bugsnag client not present');
        if (req.bugsnag) {
          req.bugsnag.notify(e);
        }
        res.status(INTERNAL_SERVER_ERROR);
      }
      sendResponse(req, res, domain, `https://${req.get('host')}`, '');
    });
  };
}
