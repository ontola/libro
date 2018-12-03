import { URL } from 'url';

import proxy from 'http-proxy-middleware';
import HttpStatus from 'http-status-codes';

import * as constants from '../config';

import { hasAction, setActionParam } from './actions';

export function isDownloadRequest(url) {
  return new URL(url, 'https://example.com').searchParams.get('download') === 'true';
}

export function isRedirect(status) {
  return status === HttpStatus.MULTIPLE_CHOICES
    || status === HttpStatus.MOVED_PERMANENTLY
    || status === HttpStatus.MOVED_TEMPORARILY
    || status === HttpStatus.SEE_OTHER
    || status === HttpStatus.TEMPORARY_REDIRECT
    || status === HttpStatus.PERMANENT_REDIRECT;
}

function setProxyReqHeaders(proxyReq, req) {
  if (typeof req.session !== 'undefined') {
    proxyReq.setHeader('Authorization', `Bearer ${req.session.arguToken.accessToken}`);
  }
  proxyReq.setHeader('X-Argu-Back', 'true');
  proxyReq.removeHeader('cookie');
}

/* eslint-disable no-param-reassign */
function setProxyResHeaders(proxyRes, req) {
  delete proxyRes.headers.vary;
  proxyRes.headers.Vary = 'Accept,Accept-Encoding,Authorization,Content-Type';
  const auth = proxyRes.headers['new-authorization'];
  if (auth) {
    delete proxyRes.headers['new-authorization'];
    req.session.arguToken.accessToken = auth;
    req.api.userToken = auth;
    if (!isRedirect(proxyRes.statusCode)) {
      if (hasAction(proxyRes, 'https://ns.ontola.io/actions/redirect')) {
        proxyRes.headers['Exec-Action'] = setActionParam(proxyRes, 'https://ns.ontola.io/actions/redirect', 'reload', 'true');
      } else {
        proxyRes.headers['Exec-Action'] = 'https://ns.ontola.io/actions/refresh';
      }
    }
  }
}
/* eslint-enable no-param-reassign */

const dekuMatch = /^\/\w*\/\w*\/od\/?.*$/;
const emailMatch = /^\/email\//;
const subscribeMatch = /^\/subscribe/;
const tokenMatch = /^\/tokens/;
const voteCompareMatch = /^\/compare\/votes/;

const defaultPort = constants.defaultServicePort ? `:${constants.defaultServicePort}` : '';

export const backendProxy = proxy({
  logLevel: constants.logLevel,
  onProxyReq: setProxyReqHeaders,
  onProxyRes: setProxyResHeaders,
  preserveHeaderKeyCase: true,
  router: (req) => {
    const path = new URL(req.url, constants.FRONTEND_URL).pathname;
    let serviceName;

    if (dekuMatch.test(path)) {
      serviceName = 'deku';
    } else if (emailMatch.test(path)) {
      serviceName = 'email';
    } else if (subscribeMatch.test(path)) {
      serviceName = 'subscribe';
    } else if (tokenMatch.test(path)) {
      serviceName = 'token';
    } else if (voteCompareMatch.test(path)) {
      serviceName = 'vote_compare';
    } else {
      serviceName = 'argu';
    }

    return `${constants.defaultServiceProto}://${serviceName}${constants.clusterURLBase}${defaultPort}`;
  },
  secure: process.env.NODE_ENV !== 'development',
  strictSSL: process.env.NODE_ENV !== 'development',
  target: constants.ARGU_API_URL,
  toProxy: true,
  xfwd: true,
});

export const fileProxy = proxy({
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
