/* eslint no-console: 0 */
import bodyParser from 'body-parser';
import csurf from 'csurf';
import express from 'express';
import { INTERNAL_SERVER_ERROR, NO_CONTENT } from 'http-status-codes';
import morgan from 'morgan';
import uuidv4 from 'uuid/v4';

import * as constants from '../../app/config';
import apiMiddleware from '../middleware/apiMiddleware';
import authenticationMiddleware from '../middleware/authenticationMiddleware';
import errorHandlerMiddleware from '../middleware/errorHandlerMiddleware';
import sessionMiddleware from '../middleware/sessionMiddleware';
import csp from '../utils/csp';
import isBackend from '../utils/filters';
import manifest from '../utils/manifest';
import {
  backendProxy,
  fileProxy,
  isDownloadRequest,
  isRedirect,
} from '../utils/proxies';
import { handleRender } from '../utils/render';

import login from './login';
import logout from './logout';
import maps from './maps';

export function listen(app, port) {
  app.listen(port, (err) => {
    if (err) {
      console.log(err);
    }
    console.info(`[${__VERSION__}]==> 🌍 Listening on port ${port}. Open up ${constants.FRONTEND_URL} in your browser.`);
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

  app.use((req, res, next) => {
    res.locals.nonce = uuidv4();
    res.setHeader('X-FE-Version', __VERSION__);
    next();
  });

  app.use(csp);

  // Static directory for express
  app.use('/static', express.static('static', { fallthrough: false }));
  app.use('/f_assets', express.static('dist/public/f_assets', { fallthrough: false }));
  app.use('/', express.static('dist/public'));
  app.get('/assets/*', backendProxy);
  app.get('/packs/*', backendProxy);
  app.get('/photos/*', backendProxy);

  app.use(sessionMiddleware);

  app.get('/logout', logout);
  app.post('/logout', logout);

  app.use(apiMiddleware);

  app.use(csurf());

  app.get('/eat', isBackend, (req, res) => {
    const snack = req.query.value.replace(/ /g, '+');
    res.setHeader('Exec-Action', `https://ns.ontola.io/actions/snackbar?text=${snack}`);

    res.status(NO_CONTENT).end();
  });

  app.use(authenticationMiddleware);

  app.all('*', isBackend, backendProxy);

  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.post('/login', login);
  app.get('/api/maps/accessToken', maps);

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
