/* eslint no-console: 0 */
import bodyParser from 'body-parser';
import csurf from 'csurf';
import expressStaticGzip from 'express-static-gzip';
import * as HttpStatus from 'http-status-codes';
import morgan from 'morgan';
import shrinkRay from 'shrink-ray-current';
import uuidv4 from 'uuid/v4';

import apiMiddleware from '../middleware/apiMiddleware';
import authenticationMiddleware from '../middleware/authenticationMiddleware';
import errorHandlerMiddleware from '../middleware/errorHandlerMiddleware';
import sessionMiddleware from '../middleware/sessionMiddleware';
import csp from '../utils/csp';
import isBackend from '../utils/filters';
import { isDownloadRequest, isHTMLHeader } from '../utils/http';
import { getErrorMiddleware } from '../utils/logging';
import { backendProxy, bulkProxy, fileProxy } from '../utils/proxies';

import application from './application';
import login from './login';
import logout from './logout';
import maps from './maps';

export function listen(app, port) {
  app.listen(port, (err) => {
    if (err) {
      console.log(err);
    }
    console.info(`[${__VERSION__}]==> 🌍 Listening on port ${port}.`);
  });
}

function isBinaryishRequest(req, res, next) {
  const isBinaryIsh = req.headers.accept && !isHTMLHeader(req.headers);

  if (isBinaryIsh || isDownloadRequest(req.url)) {
    return next();
  }

  return next('route');
}

const staticCompressionOpts = (fallthrough = false) => ({
  enableBrotli: true,
  fallthrough,
  index: false,
  orderPreference: ['br', 'gzip', 'deflate', 'identity'],
});

const compressionOpts = {
  filter: (req, res) => {
    const type = res.getHeader('Content-Type');
    return (type && type.startsWith('application/n-')) || shrinkRay.filter(req, res);
  },
};
const errorMiddleware = getErrorMiddleware();

export default function routes(app, port) {
  app.use(morgan('dev'));
  app.use(errorMiddleware.requestHandler);

  app.use((req, res, next) => {
    res.locals.nonce = uuidv4();
    res.setHeader('X-FE-Version', __VERSION__);
    next();
  });

  app.use(csp);

  // Static directory for express
  app.use('/static', expressStaticGzip('static', staticCompressionOpts()));
  app.use('/f_assets', expressStaticGzip('dist/f_assets', staticCompressionOpts()));
  app.get('/robots.txt', (req, res) => {
    if (req.host === 'demogemeente.nl') {
      return res.status(HttpStatus.NOT_FOUND).end();
    }

    return res
      .header('Content-Type', 'text/plain')
      .status(HttpStatus.OK)
      .send('User-agent: *\r\nDisallow: /\r\n')
      .end();
  });
  app.use('/', expressStaticGzip('dist/public', staticCompressionOpts(true)));
  app.get('/assets/*', backendProxy);
  app.get('/packs/*', backendProxy);
  app.get('/photos/*', backendProxy);

  app.use(sessionMiddleware);

  app.get(['/logout', '/*/logout'], logout);
  app.post(['/logout', '/*/logout'], logout);

  app.use(apiMiddleware);

  app.use(csurf());

  app.use(authenticationMiddleware);

  app.use(shrinkRay(compressionOpts));

  app.post('/link-lib/bulk', isBackend, bodyParser.urlencoded({ extended: false }), bulkProxy);
  app.all('*', isBackend, backendProxy);

  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.post('/login', login);
  app.get(['/users/auth/*', '/*/users/auth/*'], backendProxy);
  app.get('/api/maps/accessToken', maps);

  app.get(['/media_objects/*', '/*/media_objects/*'], isBinaryishRequest, fileProxy);

  app.get(/.*/, application(port));

  app.use(errorHandlerMiddleware);
  app.use(errorMiddleware.errorHandler);
}
