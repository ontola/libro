import { URL } from 'url';

import session from 'express-session';
import proxy from 'http-proxy-middleware';
import uuid from 'uuid';

import * as constants from '../../app/config';

function setHeaders(proxyReq, req) {
  if (typeof req.session !== 'undefined') {
    proxyReq.setHeader('Authorization', `Bearer ${req.session.arguToken.accessToken}`);
  }
  proxyReq.setHeader('X-Argu-Back', 'true');
}

export const backendProxy = proxy({
  onProxyReq: setHeaders,
  secure: process.env.NODE_ENV !== 'development',
  strictSSL: process.env.NODE_ENV !== 'development',
  target: constants.ARGU_API_URL,
  toProxy: true,
});

export const iframeProxy = proxy({
  onProxyReq: (proxyReq, req) => {
    if (req.method === 'GET' || req.method === 'OPTIONS') {
      setHeaders(proxyReq, req);
      if (typeof session.iframeToken === 'undefined') {
        session.iframeToken = uuid.v4();
      }
      proxyReq.setHeader('X-Iframe-Csrf-Token', session.iframeToken);
    } else {
      const csrfToken = req.headers['x-iframe-csrf-token'];
      if (typeof csrfToken !== 'undefined' && csrfToken === session.iframeToken) {
        setHeaders(proxyReq, req);
      } else {
        throw new Error('Invalid CSRF token');
      }
    }
  },
  pathRewrite: (path, req) => {
    const newPath = new URL(`https://${req.hostname}${path}`);
    newPath.searchParams.set('iframe', 'true');
    return newPath.toString().replace(newPath.origin, '');
  },
  secure: process.env.NODE_ENV !== 'development',
  strictSSL: process.env.NODE_ENV !== 'development',
  target: constants.ARGU_API_URL,
  toProxy: true,
});
