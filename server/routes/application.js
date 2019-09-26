import Stream from 'stream';

import {
  INTERNAL_SERVER_ERROR,
  SERVICE_UNAVAILABLE,
} from 'http-status-codes';

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
import processResponse from '../api/internal/statusHandler';
import { isSuccess, json } from '../../app/helpers/arguHelpers';

const BACKEND_TIMEOUT = 3000;

export default function application(port) {
  const PRELOAD_HEADERS = [
    `<${constants.ASSETS_HOST}/static/preloader.css>; rel=preload; as=style`,
    manifest['main.js'] && `<${constants.ASSETS_HOST}${manifest['main.js']}>; rel=preload; as=script`,
    __PRODUCTION__ && manifest['main.css'] && `<${constants.ASSETS_HOST}${manifest['main.css']}>; rel=preload; as=style`,
  ].filter(Boolean);

  const sendResponse = (req, res, domain, manifestData, data) => {
    if (isHTMLHeader(req.headers)) {
      res.setHeader('Link', PRELOAD_HEADERS);
    }
    res.setHeader('Vary', 'Accept,Accept-Encoding,Authorization,Content-Type');
    handleRender(req, res, port, domain, manifestData, data);

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

      const auth = serverRes.headers.get('new-authorization');
      if (auth) {
        req.session.arguToken = { accessToken: auth };
        req.api.userToken = auth;
      }

      const manifestHeader = serverRes.headers.get('Manifest');
      if (!manifestHeader) {
        if (isSuccess(serverRes.status)) {
          res.status(INTERNAL_SERVER_ERROR);

          throw new Error(`No website iri in head, got status '${serverRes.status}'`);
        }

        return res.end();
      }

      return req.api.fetchRaw(
        req.api.userToken || req.api.serviceGuestToken,
        {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            ...req.api.proxySafeHeaders(),
          },
          method: 'GET',
          path: manifestHeader,
          redirect: 'error',
        }
      )
        .then(processResponse)
        .then(json)
        .then((manifestData) => {
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
            `${manifestData.scope}`,
            `${manifestData.scope}/ns/core`,
            `${manifestData.scope}/c_a`,
            `${manifestData.scope}/n`,
            `${manifestData.scope}/search`,
            `${manifestData.scope}/menus`,
            `${manifestData.scope}/apex/menus`,
          ];
          if (req.path?.length > 1) {
            const { origin } = new URL(manifestData.scope);
            resources.unshift(origin + req.path);
          }

          return Promise
            .all(resources
              .reduce((acc, iri) => (acc.includes(iri) ? acc : acc.concat(iri)), [])
              .map(iri => bulkResourceRequest(reqForData, iri, route(iri, true), responseStream)))
            .then(() => sendResponse(req, res, domain, manifestData, responseData));
        });
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
