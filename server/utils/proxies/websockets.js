import proxy from 'http-proxy-middleware';

import * as constants from '../../config';
import logging from '../logging';

import { route, setProxyReqHeaders } from './helpers';

export default proxy({
  logLevel: constants.logLevel,
  onError: (err) => {
    logging.debug('WS error', err);
  },
  onProxyReq: setProxyReqHeaders,
  onProxyReqWs: setProxyReqHeaders,
  preserveHeaderKeyCase: true,
  router: req => route(req.url),
  secure: process.env.NODE_ENV !== 'development',
  strictSSL: process.env.NODE_ENV !== 'development',
  target: constants.ARGU_API_URL,
  ws: true,
  xfwd: true,
});
