import proxy from 'koa-http2-proxy';

import * as constants from '../../config';
import { isDownloadRequest } from '../http';

import {
  serviceUrl,
  setProxyReqHeaders,
  setProxyResHeaders,
} from './helpers';

export default proxy({
  logLevel: constants.logLevel,
  onProxyReq: setProxyReqHeaders,
  onProxyRes: (proxyRes, ctx) => {
    setProxyResHeaders(proxyRes, ctx);

    if (isDownloadRequest(ctx.req.url)) {
      // eslint-disable-next-line no-param-reassign
      proxyRes.headers['Content-Disposition'] = 'attachment';
    }
  },
  target: serviceUrl(constants.defaultBackendSVCName),
  xfwd: true,
});
