import proxy from 'http-proxy-middleware';

import * as constants from '../../config';
import { isDownloadRequest } from '../http';

import { setProxyReqHeaders, setProxyResHeaders } from './helpers';

export default proxy({
  onProxyReq: setProxyReqHeaders,
  onProxyRes: (proxyRes, req) => {
    setProxyResHeaders(proxyRes);
    if (isDownloadRequest(req.url)) {
      // eslint-disable-next-line no-param-reassign
      proxyRes.headers['Content-Disposition'] = 'attachment';
    }
  },
  preserveHeaderKeyCase: true,
  secure: process.env.NODE_ENV !== 'development',
  strictSSL: process.env.NODE_ENV !== 'development',
  target: constants.ARGU_API_URL,
  toProxy: true,
  xfwd: true,
});
