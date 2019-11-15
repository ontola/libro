import * as http from 'http';
import { URL } from 'url';
import * as zlib from 'zlib';

import HttpStatus from 'http-status-codes';

import * as constants from '../../config';
import {
  EXEC_HEADER_NAME,
  getActions,
  hasAction,
  setActionParam,
} from '../actions';

export function isRedirect(status) {
  return status === HttpStatus.MULTIPLE_CHOICES
    || status === HttpStatus.MOVED_PERMANENTLY
    || status === HttpStatus.MOVED_TEMPORARILY
    || status === HttpStatus.SEE_OTHER
    || status === HttpStatus.TEMPORARY_REDIRECT
    || status === HttpStatus.PERMANENT_REDIRECT;
}

export function setProxyReqHeaders(proxyReq, ctx) {
  if (typeof ctx.session !== 'undefined' && typeof ctx.session.arguToken !== 'undefined') {
    proxyReq.setHeader('Authorization', `Bearer ${ctx.session.arguToken.accessToken}`);
  }
  if (typeof ctx.deviceId !== 'undefined') {
    proxyReq.setHeader('X-Device-Id', ctx.deviceId);
  }
  proxyReq.setHeader('X-Argu-Back', 'true');
  proxyReq.removeHeader('cookie');
}

const VARY_HEADER = 'Accept,Accept-Encoding,Authorization,Content-Type';

export function newAuthorizationBulk(ctx, backendRes) {
  const auth = backendRes.headers['new-authorization'];
  if (auth) {
    ctx.session.arguToken = { accessToken: auth };
    ctx.api.userToken = auth;
    if (!isRedirect(backendRes.statusCode)) {
      if (hasAction(backendRes, 'https://ns.ontola.io/actions/redirect')) {
        return setActionParam(backendRes, 'https://ns.ontola.io/actions/redirect', 'reload', 'true');
      }

      return 'https://ns.ontola.io/actions/refresh';
    }
  }

  return undefined;
}

export function normalizeType(type) {
  return Array.isArray(type) ? type : [type];
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

const dekuMatch = /^\/\w*\/\w*\/od\/?.*$/;
const emailMatch = /^\/email\//;
const subscribeMatch = /^\/subscribe/;
const tokenMatch = /^(\/\w+)?\/tokens/;
const voteCompareMatch = /^\/compare\/votes/;

const defaultPort = constants.defaultServicePort ? constants.defaultServicePort : undefined;

export function route(requestUrl, full = false) {
  const url = new URL(requestUrl, 'https://example.com');
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
    serviceName = constants.defaultBackendSVCName;
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

export function bulkResourceRequest(ctx, iri, url, outputStream) {
  return new Promise((resolve, reject) => {
    try {
      const options = {
        headers: {
          ...ctx.request.headers,
          'Content-Encoding': null,
          'X-Device-Id': ctx.deviceId,
          'X-Forwarded-Host': ctx.request.headers.host,
          'X-Forwarded-Proto': 'https',
          'X-Forwarded-Ssl': 'on',
        },
        method: 'GET',
        timeout: 30000,
      };
      let buff = Buffer.alloc(0);
      const backendReq = http.request(url, options, (backendRes) => {
        const iriNT = iri.includes('://') ? `<${iri}>` : `_:${iri}`;
        outputStream.write(`${iriNT} <http://www.w3.org/2011/http#statusCode> "${backendRes.statusCode}"^^<http://www.w3.org/2001/XMLSchema#integer> <http://purl.org/link-lib/meta> .\r\n`);

        const actions = getActions(backendRes);
        if (actions.length > 0) {
          for (let i = 0; i < actions.length; i++) {
            outputStream.write(`${iriNT} <http://www.w3.org/2007/ont/httph#${EXEC_HEADER_NAME}> "${actions[i]}" <http://purl.org/link-lib/meta> .\r\n`);
          }
        }

        const redirect = newAuthorizationBulk(ctx, backendRes);
        if (redirect) {
          outputStream.write(`${iriNT} <http://www.w3.org/2007/ont/httph#${EXEC_HEADER_NAME}> "${redirect}" <http://purl.org/link-lib/meta> .\r\n`);
        }

        if (!backendRes.headers['content-type']?.includes('application/n-quads')) {
          return resolve();
        }

        let decoder;
        switch (backendRes.headers['content-encoding']) {
          case 'gzip':
            decoder = zlib.createGunzip();
            break;
          case 'deflate':
            decoder = zlib.createInflate();
            break;
          // TODO: brotli
          default:
            break;
        }

        let writeStream = backendRes;
        if (decoder) {
          writeStream = backendRes.pipe(decoder);
        }

        writeStream.on('data', (chunk) => {
          const statementTerminal = chunk.lastIndexOf('\n');
          if (statementTerminal === -1) {
            buff = Buffer.concat([buff, chunk]);
          } else {
            outputStream.write(buff);
            outputStream.write(chunk.slice(0, statementTerminal + 1));
            buff = chunk.slice(statementTerminal + 1);
          }
        });

        writeStream.on('end', () => {
          outputStream.write(buff);
          outputStream.write('\n');
          resolve();
        });

        return undefined;
      });

      backendReq.on('error', (e) => {
        backendReq.end();
        reject(e);
      });

      setProxyReqHeaders(backendReq, ctx);
      backendReq.end();
    } catch (e) {
      reject(e);
    }
  });
}
