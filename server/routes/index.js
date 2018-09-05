/* eslint no-console: 0 */
import bodyParser from 'body-parser';
import csurf from 'csurf';
import express from 'express';
import { INTERNAL_SERVER_ERROR } from 'http-status-codes';
import morgan from 'morgan';

import * as constants from '../../app/config';
import apiMiddleware from '../middleware/apiMiddleware';
import errorHandlerMiddleware from '../middleware/errorHandlerMiddleware';
import sessionMiddleware from '../middleware/sessionMiddleware';
import { isAuthenticated, isBackend, isIframe } from '../utils/filters';
import manifest from '../utils/manifest';
import {
  backendProxy,
  fileProxy,
  iframeProxy,
  isDownloadRequest,
  isRedirect,
} from '../utils/proxies';
import { handleRender } from '../utils/render';

import login from './login';
import logout from './logout';

export function listen(app, port) {
  app.listen(port, (err) => {
    if (err) {
      console.log(err);
    }
    console.info('==> 🌎 Listening on port %s. Open up %s in your browser.', port, constants.FRONTEND_URL);
  });
}

function isBinaryishRequest(req, res, next) {
  const isBinaryIsh = req.headers.accept && !(
    req.headers.accept.includes('text/html')
    || req.headers.accept.includes('application/xhtml+xml')
    || req.headers.accept.includes('application/xml'));

  if (isBinaryIsh || isDownloadRequest(req.url)) {
    return next();
  }

  return next('route');
}

export default function routes(app, port) {
  app.use(morgan('dev'));

  // Static directory for express
  app.use('/static', express.static('static'));
  app.use('/f_assets', express.static('dist/public'));
  app.get('/assets/*', backendProxy);
  app.get('/packs/*', backendProxy);
  app.get('/photos/*', backendProxy);

  app.use(sessionMiddleware);

  app.get('/logout', logout);
  app.post('/logout', logout);

  app.use(apiMiddleware);

  app.use(csurf());

  app.all('*', isIframe, isAuthenticated, iframeProxy);

  app.all('*', isBackend, isAuthenticated, backendProxy);

  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.post('/login', login);

  app.get('/media_objects/*', isBinaryishRequest, fileProxy);

  app.get(/.*/, (req, res) => {
    const domain = req.get('host').replace(/:.*/, '');

    req.api.headRequest(req).then((serverRes) => {
      res.status(serverRes.status);
      if (isRedirect(serverRes.status)) {
        const location = serverRes.headers.get('Location');
        if (!location) {
          // TODO: bugsnag
        }

        res.set('Location', location);
        return res.end();
      }

      res.setHeader(
        'Link',
        [
          `<${constants.FRONTEND_URL}/static/preloader.css>; rel=preload; as=style`,
          `<${constants.ASSETS_HOST}${manifest['main.js']}>; rel=preload; as=script`,
          `<${constants.ASSETS_HOST}${manifest['main.css']}>; rel=preload; as=style`,
        ]
      );
      res.setHeader('Vary', 'Accept,Accept-Encoding,Authorization,Content-Type');
      handleRender(req, res, port, domain);
      return undefined;
    }).catch((e) => {
      console.log(e);
      // TODO: bugsnag
      res.sendStatus(INTERNAL_SERVER_ERROR).end();
    });
  });

  app.use(errorHandlerMiddleware);
}
