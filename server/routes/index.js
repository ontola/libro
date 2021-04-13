/* eslint no-console: 0 */
import { constants } from 'zlib';

import Router from '@koa/router';
import bodyParser from 'koa-bodyparser';
import compress from 'koa-compress';
import CSRF from 'koa-csrf';
import serveStatic from 'koa-static';
import logger from 'koa-logger';

import apiMiddleware from '../middleware/apiMiddleware';
import authenticationMiddleware from '../middleware/authenticationMiddleware';
import ctxMiddleware from '../middleware/ctxMiddleware';
import ensureAccessTokenMiddleware from '../middleware/ensureAccessTokenMiddleware';
import backendErrorHandler from '../middleware/errorHandlerMiddleware';
import sessionMiddleware from '../middleware/sessionMiddleware';
import csp from '../utils/csp';
import deviceIdMiddleware from '../utils/deviceId';
import {
  isBackend,
  isBinaryishRequest,
  isPlainAPI,
  isWebsocket,
} from '../utils/filters';
import { securityHeaders } from '../utils/http';
import { getErrorMiddleware } from '../utils/logging';
import {
  backendProxy,
  fileProxy,
  loginProxy,
} from '../utils/proxies';

import application from './application';
import {
  docMiddleware,
  document,
  documents,
  saveDocument,
} from './document';
import health from './health';
import logout from './logout';
import precacheManifest from './manifests';
import serviceWorker from './service_workers';
import maps from './maps';
import robots from './robots';

const ONE_WEEK = 604800000;

export function listen(app, port) {
  app.listen(port, (err) => {
    if (err) {
      console.log('Error occurred while listening', err);
    }
    console.info(`[${__VERSION__}]==> 🌍 Listening on port ${port}.`);
  });
}

const staticCompressionOpts = {
  br: true,
  extensions: ['br', 'gzip', 'deflate', 'identity'],
  index: false,
  maxage: ONE_WEEK,
};

const errorMiddleware = getErrorMiddleware();

const routes = async function routes(app, port) {
  const isPlainAPIReq = await isPlainAPI();
  const sessMiddleware = sessionMiddleware(app);
  const backend = backendProxy(app);
  const login = loginProxy(app);

  app.use(errorMiddleware.requestHandler);

  app.use(backendErrorHandler);

  if (__DEVELOPMENT__) {
    app.use(logger());
  }

  app.use(ctxMiddleware);

  app.use(deviceIdMiddleware);
  app.use(compress({
    deflate: {
      flush: constants.Z_SYNC_FLUSH,
    },
    gzip: {
      flush: constants.Z_SYNC_FLUSH,
    },
  }));

  const router = new Router();

  if (__DEVELOPMENT__) {
    // eslint-disable-next-line no-inline-comments
    const editorContext = await import(/* webpackChunkName: "dev" */'./pageBuilder');
    router.get('/d/builder/editorContext.bundle.json', editorContext.default);
  }

  router.use(securityHeaders);

  router.get('/d/health', health);
  router.get('*/sw.js*', serviceWorker);
  router.get('/robots.txt', robots);

  // Static files
  router.get('/static/*', serveStatic('.', staticCompressionOpts), () => {});
  router.get('/f_assets/*', serveStatic('./dist', staticCompressionOpts), () => {});
  router.get('/public/*', serveStatic('./dist', staticCompressionOpts), () => {});
  router.get('/assets/*', backend);
  router.get('/packs/*', backend);
  router.get('/photos/*', backend);

  router.use('/_libro/docs', bodyParser());
  router.get('/_libro/docs', documents);
  router.get('/_libro/docs/:id', document);
  __DEVELOPMENT__ && router.post('/_libro/docs/:id', saveDocument);

  router.use(sessMiddleware);

  router.use(apiMiddleware);

  router.use(docMiddleware);

  router.use(authenticationMiddleware);

  router.all('*', isPlainAPIReq(backend));

  router.get('*/f_assets/precache-manifest.*.js*', precacheManifest);
  router.get(['/logout', '/*/logout'], logout);
  router.post(['/logout', '/*/logout'], logout);

  router.use(ensureAccessTokenMiddleware);

  router.post(['/follows/*', '/*/follows/*'], backend);

  router.use(new CSRF());

  router.post(['/login', '/*/login'], login);
  router.all('*', isWebsocket(backend));
  router.all('*', isBackend(backend));

  router.use(bodyParser());
  router.get(['/users/auth/*', '/*/users/auth/*'], backend);
  router.get('/api/maps/accessToken', maps);

  router.get('/*/media_objects/*', isBinaryishRequest(fileProxy));

  router.use(csp);

  router.get(/.*/, application(port));

  app
    .use(router.routes())
    .use(router.allowedMethods());

  app.on('error', errorMiddleware.errorHandler);
};

export default routes;
