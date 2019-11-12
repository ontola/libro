/* eslint no-console: 0 */
import Router from '@koa/router';
import bodyParser from 'koa-bodyparser';
import CSRF from 'koa-csrf';
import serveStatic from 'koa-static';
import uuidv4 from 'uuid/v4';
import logger from 'koa-logger';

import apiMiddleware from '../middleware/apiMiddleware';
import authenticationMiddleware from '../middleware/authenticationMiddleware';
import backendErrorHandler from '../middleware/errorHandlerMiddleware';
import sessionMiddleware from '../middleware/sessionMiddleware';
import csp from '../utils/csp';
import deviceIdMiddleware from '../utils/deviceId';
import {
  isBackend,
  isBinaryishRequest,
  isPlainAPI,
} from '../utils/filters';
import { getErrorMiddleware } from '../utils/logging';
import {
  backendProxy,
  bulkProxy,
  fileProxy,
  websocketsProxy,
} from '../utils/proxies';

import application from './application';
import health from './health';
import login from './login';
import logout from './logout';
import precacheManifest from './manifests';
import serviceWorker from './service_workers';
import maps from './maps';
import robots from './robots';

export function listen(app, port) {
  const server = app.listen(port, (err) => {
    if (err) {
      console.log(err);
    }
    console.info(`[${__VERSION__}]==> 🌍 Listening on port ${port}.`);
  });
  const sessMiddleware = sessionMiddleware(app);

  server.on('upgrade', (req, socket) => {
    const ctx = app.createContext(req, {});
    ctx.req.getCtx = () => ctx;

    return sessMiddleware(ctx, () => {
      websocketsProxy.upgrade(req, socket);
    });
  });
}

const staticCompressionOpts = {
  br: true,
  extensions: ['br', 'gzip', 'deflate', 'identity'],
  index: false,
};

const errorMiddleware = getErrorMiddleware();

const routes = async function routes(app, port) {
  const isPlainAPIReq = await isPlainAPI();
  const sessMiddleware = sessionMiddleware(app);

  app.use(errorMiddleware.requestHandler);

  app.use(backendErrorHandler);

  if (__DEVELOPMENT__) {
    app.use(logger());
  }

  app.use(async (ctx, next) => {
    ctx.res.locals = { nonce: uuidv4() };
    ctx.req.getCtx = () => ctx;
    ctx.response.set('X-FE-Version', __VERSION__);

    return next();
  });

  app.use(deviceIdMiddleware);

  app.use(csp);

  const router = new Router();

  router.get('/d/health', health);
  router.get('(/*)?/sw.js*', serviceWorker);
  router.get('/f_assets/precache-manifest.*.js*', precacheManifest);
  router.all('*', isPlainAPIReq(backendProxy));
  router.get('/robots.txt', robots);

  // Static files
  router.get('/static/*', serveStatic('.', staticCompressionOpts), () => {});
  router.get('/f_assets/*', serveStatic('./dist', staticCompressionOpts), () => {});
  router.get('/assets/*', backendProxy);
  router.get('/packs/*', backendProxy);
  router.get('/photos/*', backendProxy);

  router.use(sessMiddleware);

  router.use(apiMiddleware);

  router.get(['/logout', '/*/logout'], logout);
  router.post(['/logout', '/*/logout'], logout);

  router.use(new CSRF());

  router.use(authenticationMiddleware);

  router.post('/link-lib/bulk', bodyParser(), isBackend(bulkProxy));
  router.all('*', isBackend(backendProxy));

  router.use(bodyParser());
  router.post('/login', login);
  router.get(['/users/auth/*', '/*/users/auth/*'], backendProxy);
  router.get('/api/maps/accessToken', maps);

  router.get('/*/media_objects/*', isBinaryishRequest(fileProxy));

  router.get(/.*/, application(port));

  app
    .use(router.routes())
    .use(router.allowedMethods());

  app.on('error', errorMiddleware.errorHandler);
};

export default routes;
