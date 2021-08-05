import { constants } from 'zlib';

import Router from '@koa/router';
import bodyParser from 'koa-bodyparser';
import compress from 'koa-compress';
import CSRF from 'koa-csrf';
import logger from 'koa-logger';
import serveStatic from 'koa-static';
/* eslint no-console: 0 */

import { standaloneLibro } from '../config';
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
  offlineDocument,
  saveDocument,
} from './document';
import health from './health';
import logout from './logout';
import precacheManifest from './manifests';
import maps from './maps';
import robots from './robots';
import serviceWorker from './service_workers';

const ONE_YEAR = 31536000000;

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
  maxage: ONE_YEAR,
};

const errorMiddleware = getErrorMiddleware();

const routes = async function routes(app, port) {
  const isPlainAPIReq = await isPlainAPI();
  const sessMiddleware = sessionMiddleware(app);
  const backend = !standaloneLibro ? backendProxy(app) : undefined;

  app.use(errorMiddleware.requestHandler);

  app.use(backendErrorHandler);

  if (__DEVELOPMENT__) {
    app.use(logger());
  }

  app.use(ctxMiddleware);

  app.use(deviceIdMiddleware);
  app.use(compress({
    br: {
      params: {
        [constants.BROTLI_PARAM_QUALITY]: 7
      }
    },
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

  if (standaloneLibro) {
    router.get('/manifest.json', (ctx) => {
      ctx.body = ctx.getManifest();
    })
  }

  router.get('/d/health', health);
  router.get('*/sw.js*', serviceWorker);
  router.get('/robots.txt', robots);

  // Static files
  router.get('/static/*', serveStatic('.', staticCompressionOpts), () => {});
  router.get('/f_assets/*', serveStatic('./dist', staticCompressionOpts), () => {});
  router.get('/offline.html', offlineDocument, serveStatic('./dist', staticCompressionOpts), () => {});
  router.get('/*/offline.html', offlineDocument, serveStatic('./dist', staticCompressionOpts), () => {});
  router.get('/public/*', serveStatic('./dist', staticCompressionOpts), () => { });

  if (!standaloneLibro) {
    router.get('/assets/*', backend);
    router.get('/packs/*', backend);
    router.get('/photos/*', backend);
  }

  router.use('/_libro/docs', bodyParser());
  router.get('/_libro/docs', documents);
  router.get('/_libro/docs/:id', document);
  __DEVELOPMENT__ && router.post('/_libro/docs/:id', saveDocument);

  router.use(sessMiddleware);

  if (!standaloneLibro) {
    router.use(apiMiddleware);
  }

  router.use(docMiddleware);

  if (!standaloneLibro) {
    router.use(authenticationMiddleware);

    router.all('*', isPlainAPIReq(backend));
  }

  router.get('*/f_assets/precache-manifest.*.js*', precacheManifest);
  router.get(['/logout', '/*/logout'], logout);
  router.post(['/logout', '/*/logout'], logout);

  if (!standaloneLibro) {
    router.use(ensureAccessTokenMiddleware);

    router.post(['/follows/*', '/*/follows/*'], backend);
  }

  router.use(new CSRF());

  if (!standaloneLibro) {
    const login = loginProxy(app);
    router.post(['/login', '/*/login'], login);
    router.all('*', isWebsocket(backend));
    router.all('*', isBackend(backend));
  }

  router.use(bodyParser());

  if (!standaloneLibro) {
    router.get(['/u/auth/*', '/*/u/auth/*'], backend);
  }

  router.get('/api/maps/accessToken', maps);

  if (!standaloneLibro) {
    router.get('/*/media_objects/*', isBinaryishRequest(fileProxy));
  }

  router.use(csp);

  router.get(/.*/, application(port));

  app
    .use(router.routes())
    .use(router.allowedMethods());

  app.on('error', errorMiddleware.errorHandler);
};

export default routes;
