import proxy from 'koa-http2-proxy';

import * as constants from '../../config';
import sessionMiddleware from '../../middleware/sessionMiddleware';

import {
  route,
  setProxyReqHeaders,
  setProxyResHeaders,
} from './helpers';

export default (app) => {
  const sessMiddleware = sessionMiddleware(app);

  return proxy({
    app,
    logLevel: constants.logLevel,
    onProxyReq: setProxyReqHeaders,
    onProxyRes: setProxyResHeaders,
    onUpgrade: async (ctx) => {
      await sessMiddleware(ctx, () => {});
    },
    protocol: 'https',
    router: req => route(req.url),
    target: constants.ARGU_API_URL,
    ws: true,
    xfwd: true,
  });
};
