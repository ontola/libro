import proxy from 'koa-http2-proxy';

import * as constants from '../../config';

import {
  route,
  serviceUrl,
  setProxyReqHeaders,
  setProxyResHeaders,
} from './helpers';

export default (app) => (
  proxy({
    app,
    logLevel: constants.logLevel,
    onError: (e, ctx) => {
      ctx.response.status = e.statusCode;
    },
    onProxyReq: setProxyReqHeaders,
    onProxyRes: setProxyResHeaders,
    pathRewrite: (path, req) => (
      `${new URL(`${req.headers['website-iri']}/oauth/token`).pathname}?client_id=${constants.clientId}&client_secret=${constants.clientSecret}&grant_type=password&scope=user`
    ),
    router: (req) => route(req.url),
    target: serviceUrl(constants.defaultBackendSVCName),
    xfwd: true,
  })
);
