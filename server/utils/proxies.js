import { URL } from 'url';

import session from 'express-session';
import proxy from 'http-proxy-middleware';
import HttpStatus from 'http-status-codes';
import uuid from 'uuid';

import * as constants from '../../app/config';

function isRedirect(status) {
  return status === HttpStatus.MULTIPLE_CHOICES
    || status === HttpStatus.MOVED_PERMANENTLY
    || status === HttpStatus.MOVED_TEMPORARILY
    || status === HttpStatus.SEE_OTHER
    || status === HttpStatus.TEMPORARY_REDIRECT
    || status === HttpStatus.PERMANENT_REDIRECT;
}

function setHeaders(proxyReq, req) {
  if (typeof req.session !== 'undefined') {
    proxyReq.setHeader('Authorization', `Bearer ${req.session.arguToken.accessToken}`);
  }
  proxyReq.setHeader('X-Argu-Back', 'true');
}

export const backendProxy = proxy({
  onProxyReq: setHeaders,
  preserveHeaderKeyCase: true,
  secure: process.env.NODE_ENV !== 'development',
  strictSSL: process.env.NODE_ENV !== 'development',
  target: constants.ARGU_API_URL,
  toProxy: true,
  xfwd: true,
});

export const iframeProxy = proxy({
  onProxyReq: (proxyReq, req) => {
    if (req.method === 'GET' || req.method === 'OPTIONS') {
      setHeaders(proxyReq, req);
      if (typeof session.iframeToken === 'undefined') {
        session.iframeToken = uuid.v4();
      }
      proxyReq.setHeader('X-Iframe-Csrf-Token', session.iframeToken);
      proxyReq.setHeader('X-Client-Csrf-Token', req.csrfToken());
    } else {
      const csrfToken = req.headers['x-iframe-csrf-token'];
      if (typeof csrfToken !== 'undefined' && csrfToken === session.iframeToken) {
        setHeaders(proxyReq, req);
      } else {
        throw new Error('Invalid CSRF token');
      }
    }
  },
  onProxyRes: (proxyRes) => {
    if (isRedirect(proxyRes.statusCode)) {
      const location = new URL(proxyRes.headers.location);
      location.searchParams.set('iframe', 'positive');
      // eslint-disable-next-line no-param-reassign
      proxyRes.headers.location = location.toString();
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
