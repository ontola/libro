/* eslint no-console: 0 */
import bodyParser from 'body-parser';
import csurf from 'csurf';
import expressStaticGzip from 'express-static-gzip';
import { NO_CONTENT } from 'http-status-codes';
import morgan from 'morgan';
import uuidv4 from 'uuid/v4';

import * as constants from '../../app/config';
import apiMiddleware from '../middleware/apiMiddleware';
import authenticationMiddleware from '../middleware/authenticationMiddleware';
import errorHandlerMiddleware from '../middleware/errorHandlerMiddleware';
import sessionMiddleware from '../middleware/sessionMiddleware';
import csp from '../utils/csp';
import isBackend from '../utils/filters';
import { isDownloadRequest, isHTMLHeader } from '../utils/http';
import { bugsnagMiddleware } from '../utils/logging';
import { backendProxy, fileProxy } from '../utils/proxies';

import application from './application';
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
  const isBinaryIsh = req.headers.accept && !isHTMLHeader(req.headers);

  if (isBinaryIsh || isDownloadRequest(req.url)) {
    return next();
  }

  return next('route');
}

const compressionOpts = (fallthrough = false) => ({
  enableBrotli: true,
  fallthrough,
  orderPreference: ['br', 'gzip'],
});

export default function routes(app, port) {
  app.use(morgan('dev'));
  app.use(bugsnagMiddleware.requestHandler);

  app.use((req, res, next) => {
    res.locals.nonce = uuidv4();
    res.setHeader('X-FE-Version', __VERSION__);
    next();
  });

  app.use(csp);

  // Static directory for express
  app.use('/static', expressStaticGzip('static', compressionOpts()));
  app.use('/f_assets', expressStaticGzip('dist/public/f_assets', compressionOpts()));
  app.use('/', expressStaticGzip('dist/public', compressionOpts(true)));
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
  app.get('/users/auth/*', backendProxy);
  app.get('/api/maps/accessToken', maps);

  app.get('/media_objects/*', isBinaryishRequest, fileProxy);

  app.get(/.*/, application(port));

  app.use(errorHandlerMiddleware);
  app.use(bugsnagMiddleware.errorHandler);
}
