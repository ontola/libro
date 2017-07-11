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
import { handleRender } from '../utils/render';
import { isAuthenticated, isBackend, isIframe } from '../utils/filters';
import { backendProxy, iframeProxy, odApiProxy } from '../utils/proxies';

import login from './login';

const redisAddress = process.env.REDIS_ADDRESS;
const RedisStore = connectRedis(session);
const redisStore = new RedisStore({ url: redisAddress });
const sessionSecret = process.env.SESSION_SECRET;

const BACKEND_ROUTES = /^\/(a|actors|announcements|c_a|documents|f|follows|g|group_memberships|i|lr|m|media_objects|o|oauth|phases|policy|portal|posts|privacy|profiles|q|qa|settings|shortnames|u|users|v|vote_events|vote_matches)(\/|$)/;

if (!sessionSecret) {
  console.log('NO SESSION SECRET');
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

export default function routes(app, port) {
  app.use(morgan('dev'));

  // Static directory for express
  app.use('/static', express.static('static'));
  app.use('/dist', express.static('dist'));
  if (__DEVELOPMENT__) {
    app.get('/assets/*', backendProxy);
  }

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

  app.all('*', isIframe, isAuthenticated, iframeProxy);

  app.post(BACKEND_ROUTES, isBackend, isAuthenticated, backendProxy);

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

  app.get(/.*/, isBackend, isAuthenticated, (req, res) => {
    if (req.originalUrl.match(BACKEND_ROUTES) !== null) {
      return backendProxy(req, res);
    }
    return odApiProxy(req, res);
  });

  app.get(/.*/, (req, res) => {
    const domain = req.get('host').replace(/:.*/, '');

    res.setHeader('Link', `${constants.FRONTEND_URL}/static/preloader.css; rel=preload; as=style`);
    handleRender(req, res, port, domain);
    // res.send(renderFullPage('', port, domain, req.csrfToken())).end();
    return undefined;
  });
}
