import proxy from 'http-proxy-middleware';

import { handle } from '../../../app/helpers/logging';
import * as constants from '../../config';
import sessionParser from '../../middleware/sessionMiddleware';

import { route, setProxyReqHeaders } from './helpers';

export default proxy({
  logLevel: constants.logLevel,
  onError: (err, req, res) => {
    try {
      res.end();
    } catch (e) {
      handle(e);
    }
  },
  onProxyReq: setProxyReqHeaders,
  onProxyReqWs: (proxyReq, req) => {
    sessionParser(req, {}, () => {
      setProxyReqHeaders(proxyReq, req);
    });
  },
  preserveHeaderKeyCase: true,
  router: req => route(req.url),
  secure: process.env.NODE_ENV !== 'development',
  strictSSL: process.env.NODE_ENV !== 'development',
  target: constants.ARGU_API_URL,
  ws: true,
  xfwd: true,
});
