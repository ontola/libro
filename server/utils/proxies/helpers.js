import { URL } from 'url';

import * as xsd from '@ontologies/xsd';
import HttpStatus from 'http-status-codes';

import * as constants from '../../config';
import {
  EXEC_HEADER_NAME,
  hasAction,
  setActionParam,
} from '../actions';

export const NEW_AUTHORIZATION_HEADER = 'new-authorization';
export const NEW_REFRESH_TOKEN_HEADER = 'new-refresh-token';
export const LOCATION_HEADER = 'location';
export const ALLOW_CREDENTIALS = 'access-control-allow-credentials';
export const ALLOW_HEADERS = 'access-control-allow-headers';
export const ALLOW_METHODS = 'access-control-allow-methods';
export const ALLOW_ORIGIN = 'access-control-allow-origin';

export function isRedirect(status) {
  return status === HttpStatus.MULTIPLE_CHOICES
    || status === HttpStatus.MOVED_PERMANENTLY
    || status === HttpStatus.MOVED_TEMPORARILY
    || status === HttpStatus.SEE_OTHER
    || status === HttpStatus.TEMPORARY_REDIRECT
    || status === HttpStatus.PERMANENT_REDIRECT;
}

function filterCookie(cookie) {
  return constants.cookieWhitelist.includes(cookie.split('=').shift());
}

function filterCookies(cookies) {
  if (!cookies || constants.cookieWhitelist.length === 0) {
    return '';
  }

  return cookies.split('; ').filter(filterCookie).join('; ');
}

export function setProxyReqHeaders(proxyReq, ctx) {
  if (typeof ctx.session !== 'undefined' && typeof ctx.session.userToken !== 'undefined') {
    proxyReq.setHeader('Authorization', `Bearer ${ctx.session.userToken}`);
  }

  if (typeof ctx.deviceId !== 'undefined') {
    proxyReq.setHeader('X-Device-Id', ctx.deviceId);
  }

  proxyReq.setHeader('X-Argu-Back', 'true');

  if (ctx.request.get('Upgrade') !== 'websocket') {
    proxyReq.setHeader('Connection', 'keep-alive');
  }

  const filteredCookies = filterCookies(proxyReq.getHeader('cookie'));

  if (filteredCookies.length === 0) {
    proxyReq.removeHeader('cookie');
  } else {
    proxyReq.setHeader('cookie', filteredCookies);
  }
}

const VARY_HEADER = 'Accept,Accept-Encoding,Authorization,Content-Type';

export function newAuthorizationBulk(ctx, backendRes) {
  const auth = backendRes.headers[NEW_AUTHORIZATION_HEADER];

  if (auth) {
    const refreshToken = backendRes.headers[NEW_REFRESH_TOKEN_HEADER];
    ctx.setAccessToken(auth, refreshToken);

    if (!isRedirect(backendRes.statusCode)) {
      if (hasAction(backendRes, 'https://ns.ontola.io/libro/actions/redirect')) {
        return setActionParam(backendRes, 'https://ns.ontola.io/libro/actions/redirect', 'reload', 'true');
      }

      const locationHeader = backendRes.headers[LOCATION_HEADER];

      if (locationHeader && locationHeader.length > 0) {
        return `https://ns.ontola.io/libro/actions/redirect?location=${encodeURIComponent(locationHeader)}&reload=true`;
      }

      return 'https://ns.ontola.io/libro/actions/refresh';
    }
  }

  return undefined;
}

/* eslint-disable no-param-reassign */
export function setProxyResHeaders(proxyRes, ctx) {
  delete proxyRes.headers.vary;
  proxyRes.headers.Vary = VARY_HEADER;
  const redirect = newAuthorizationBulk(ctx, proxyRes);

  if (redirect) {
    proxyRes.headers[EXEC_HEADER_NAME] = redirect;
  }
}
/* eslint-enable no-param-reassign */

export function setBulkResHeaders(res) {
  res.set('Vary', VARY_HEADER);
}

const bulkMatch = /^\/link-lib\//;
const dekuMatch = /^\/\w*\/\w*\/od\/?.*$/;
const emailMatch = /^\/email\//;
const subscribeMatch = /^\/subscribe/;
const tokenMatch = /^(\/\w+)?\/tokens/;
const voteCompareMatch = /^\/compare\/votes/;

const defaultPort = constants.defaultServicePort ? constants.defaultServicePort : undefined;

export function serviceUrl(serviceName, url = new URL('https://example.com'), port = defaultPort, full = true) {
  url.port = port;
  url.protocol = constants.defaultServiceProto;
  url.host = `${serviceName}${constants.clusterURLBase}`;

  if (full) {
    return url.toString();
  }

  return url.origin;
}

export function route(requestUrl, full = false) {
  const url = new URL(requestUrl, 'https://example.com');
  const path = url.pathname;
  let port;
  let serviceName;

  if (defaultPort) {
    port = defaultPort;
  }

  if (bulkMatch.test(path)) {
    serviceName = 'cache';
    port = '3030';
  } else if (dekuMatch.test(path)) {
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
    serviceName = constants.defaultBackendSVCName;
  }

  return serviceUrl(serviceName, url, port, full)
}

export const statusCodeHex = (iriHJ, status) => ([
  iriHJ,
  'http://www.w3.org/2011/http#statusCode',
  status.toString(),
  xsd.integer.value,
  '',
  'http://purl.org/link-lib/meta',
]);
