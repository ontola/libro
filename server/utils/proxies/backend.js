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
    onError: (e, ctx) => {
      ctx.response.status = e.statusCode;
    },
    onProxyReq: setProxyReqHeaders,
    onProxyRes: setProxyResHeaders,
    onUpgrade: async (ctx) => {
      await sessMiddleware(ctx, () => {});
    },
    router: (req) => route(req.url),
    target: constants.backendApiUrl,
    ws: true,
    xfwd: true,
  });
};
