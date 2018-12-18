import { INTERNAL_SERVER_ERROR, SERVICE_UNAVAILABLE } from 'http-status-codes';

import * as constants from '../../app/config';
import { isHTMLHeader } from '../utils/http';
import logging from '../utils/logging';
import manifest from '../utils/manifest';
import { isRedirect } from '../utils/proxies';
import { handleRender } from '../utils/render';

const BACKEND_TIMEOUT = 3000;

export default function application(port) {
  const PRELOAD_HEADERS = [
    `<${constants.FRONTEND_URL}/static/preloader.css>; rel=preload; as=style`,
    manifest['main.js'] && `<${constants.ASSETS_HOST}${manifest['main.js']}>; rel=preload; as=script`,
    __PRODUCTION__ && manifest['main.css'] && `<${constants.ASSETS_HOST}${manifest['main.css']}>; rel=preload; as=style`,
  ].filter(Boolean);

  const sendResponse = (req, res, domain) => {
    if (isHTMLHeader(req.headers)) {
      res.setHeader('Link', PRELOAD_HEADERS);
    }
    res.setHeader('Vary', 'Accept,Accept-Encoding,Authorization,Content-Type');
    handleRender(req, res, port, domain);

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

      return sendResponse(req, res, domain);
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
      sendResponse(req, res, domain);
    });
  };
}
