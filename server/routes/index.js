/* eslint no-console: 0 */
import bodyParser from 'body-parser';
import csurf from 'csurf';
import express from 'express';
import session from 'express-session';
import connectRedis from 'connect-redis';
import proxy from 'http-proxy-middleware';
import morgan from 'morgan';
import SearchkitExpress from 'searchkit-express';

import * as constants from '../../app/config';
import { renderFullPage } from '../utils/render';
import verifyAuthenticated from '../utils/authentication';

import login from './login';

const redisAddress = process.env.REDIS_ADDRESS;
const RedisStore = connectRedis(session);
const redisStore = new RedisStore({ url: redisAddress });
const sessionSecret = process.env.SESSION_SECRET;

const BACKEND_ROUTES = /^\/(f|m|q|a|u|v|c_a|vote_matches)(\/|$)/;

if (!sessionSecret) {
  process.exit(1);
}

export function listen(app, port) {
  app.listen(port, (err) => {
    if (err) {
      console.log(err);
    }
    console.info('==> 🌎 Listening on port %s. Open up %s in your browser.', port, constants.FRONTEND_URL);
  });
}

function setHeaders(proxyReq, req) {
  proxyReq.setHeader('Authorization', `Bearer ${req.session.arguToken.accessToken}`);
}

const backendProxy = proxy({
  changeOrigin: true,
  onProxyReq: setHeaders,
  secure: process.env.NODE_ENV !== 'development',
  strictSSL: process.env.NODE_ENV !== 'development',
  target: constants.ARGU_API_URL,
  toProxy: true,
});

const odApiProxy = proxy({
  changeOrigin: true,
  pathRewrite: { '^/': '/api/' },
  target: constants.AOD_API_URL,
});

function isBackend(req, res, next) {
  const accept = req.get('Accept');
  if (accept && (accept.includes('application/vnd.api+json') || accept.includes('application/json'))) {
    next();
  } else {
    next('route');
  }
}

export default function routes(app, port) {
  app.use(morgan('dev'));

  // Static directory for express
  app.use('/static', express.static('static'));
  app.use('/dist', express.static('dist'));

  app.use(session({
    cookie: {
      httpOnly: true,
      secure: true,
    },
    proxy: true,
    resave: false,
    saveUninitialized: true,
    secret: sessionSecret,
    store: redisStore,
  }));

  app.post(BACKEND_ROUTES, isBackend, verifyAuthenticated, backendProxy);

  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());

  app.use(csurf());

  // Activate proxy for session
  app.use(/\/api\/(.*)/, proxy({
    changeOrigin: true,
    target: constants.ARGU_API_URL,
  }));

  app.use('/aod_search', SearchkitExpress.createRouter({
    host: constants.ELASTICSEARCH_URL,
    index: constants.ELASTICSEARCH_INDEX,
  }));

  app.post('/login', login);

  app.get(/.*/, isBackend, verifyAuthenticated, (req, res) => {
    if (req.originalUrl.match(BACKEND_ROUTES) !== null) {
      return backendProxy(req, res);
    }
    return odApiProxy(req, res);
  });

  app.get(/.*/, (req, res) => {
    const domain = req.get('host').replace(/:.*/, '');

    res.setHeader('Link', `${constants.FRONTEND_URL}/static/preloader.css; rel=preload; as=style`);
    res.send(renderFullPage('', port, domain, req.csrfToken())).end();
    return undefined;
  });
}
