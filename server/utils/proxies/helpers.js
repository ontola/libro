import { URL } from 'url';

import HttpStatus from 'http-status-codes';

import * as constants from '../../config';
import { EXEC_HEADER_NAME, hasAction, setActionParam } from '../actions';

export function isRedirect(status) {
  return status === HttpStatus.MULTIPLE_CHOICES
    || status === HttpStatus.MOVED_PERMANENTLY
    || status === HttpStatus.MOVED_TEMPORARILY
    || status === HttpStatus.SEE_OTHER
    || status === HttpStatus.TEMPORARY_REDIRECT
    || status === HttpStatus.PERMANENT_REDIRECT;
}

export function setProxyReqHeaders(proxyReq, req) {
  if (typeof req.session !== 'undefined') {
    proxyReq.setHeader('Authorization', `Bearer ${req.session.arguToken.accessToken}`);
  }
  proxyReq.setHeader('X-Argu-Back', 'true');
  proxyReq.removeHeader('cookie');
}

const VARY_HEADER = 'Accept,Accept-Encoding,Authorization,Content-Type';

/* eslint-disable no-param-reassign */
export function setProxyResHeaders(proxyRes, req) {
  delete proxyRes.headers.vary;
  proxyRes.headers.Vary = VARY_HEADER;
  const auth = proxyRes.headers['new-authorization'];
  if (auth) {
    delete proxyRes.headers['new-authorization'];
    req.session.arguToken.accessToken = auth;
    req.api.userToken = auth;
    if (!isRedirect(proxyRes.statusCode)) {
      if (hasAction(proxyRes, 'https://ns.ontola.io/actions/redirect')) {
        proxyRes.headers[EXEC_HEADER_NAME] = setActionParam(proxyRes, 'https://ns.ontola.io/actions/redirect', 'reload', 'true');
      } else {
        proxyRes.headers[EXEC_HEADER_NAME] = 'https://ns.ontola.io/actions/refresh';
      }
    }
  }
}
/* eslint-enable no-param-reassign */

export function setBulkResHeaders(res) {
  res.setHeader('Vary', VARY_HEADER);
}

const dekuMatch = /^\/\w*\/\w*\/od\/?.*$/;
const emailMatch = /^\/email\//;
const subscribeMatch = /^\/subscribe/;
const tokenMatch = /^\/tokens/;
const voteCompareMatch = /^\/compare\/votes/;

const defaultPort = constants.defaultServicePort ? constants.defaultServicePort : undefined;

export function route(requestUrl, full = false) {
  const url = new URL(requestUrl, constants.FRONTEND_URL);
  const path = url.pathname;
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

  url.protocol = constants.defaultServiceProto;
  url.host = `${serviceName}${constants.clusterURLBase}`;
  if (defaultPort) {
    url.port = defaultPort;
  }

  if (full) {
    return url.toString();
  }

  return url.origin;
}
