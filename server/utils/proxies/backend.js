import proxy from 'http-proxy-middleware';
import c2k from 'koa2-connect';

import * as constants from '../../config';

import {
  route,
  setProxyReqHeaders,
  setProxyResHeaders,
} from './helpers';

export default c2k(proxy({
  logLevel: constants.logLevel,
  onProxyReq: setProxyReqHeaders,
  onProxyRes: setProxyResHeaders,
  preserveHeaderKeyCase: true,
  router: req => route(req.url),
  secure: process.env.NODE_ENV !== 'development',
  strictSSL: process.env.NODE_ENV !== 'development',
  target: constants.ARGU_API_URL,
  toProxy: true,
  xfwd: true,
}));
