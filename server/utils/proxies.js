import * as http from 'http';
import * as zlib from 'zlib';
import { URL } from 'url';

import proxy from 'http-proxy-middleware';
import HttpStatus from 'http-status-codes';

import * as constants from '../config';

import { hasAction, setActionParam } from './actions';
import { isDownloadRequest } from './http';
import logging from './logging';

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

const defaultPort = constants.defaultServicePort ? constants.defaultServicePort : undefined;

function route(requestUrl, full = false) {
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

export const backendProxy = proxy({
  logLevel: constants.logLevel,
  onProxyReq: setProxyReqHeaders,
  onProxyRes: setProxyResHeaders,
  preserveHeaderKeyCase: true,
  router: req => route(req.url),
  secure: process.env.NODE_ENV !== 'development',
  strictSSL: process.env.NODE_ENV !== 'development',
  target: constants.ARGU_API_URL,
  toProxy: true,
  xfwd: true,
});

export const bulkProxy = (req, res) => {
  res.append('Content-Type', 'application/n-quads; charset=utf-8');

  const bulkUrl = new URL(req.url, constants.FRONTEND_URL);
  const requests = [];
  const resources = bulkUrl
    .searchParams
    .getAll('resource')
    .map(iri => [decodeURIComponent(iri), route(decodeURIComponent(iri), true)])
    .map(([iri, url]) => new Promise((resolve, reject) => {
      try {
        const options = {
          headers: {
            ...req.headers,
            'Content-Encoding': null,
          },
          method: 'GET',
          timeout: 30000,
        };
        let buff = Buffer.alloc(0);
        const backendReq = http.request(url, options, (backendRes) => {
          const iriNT = iri.includes('://') ? `<${iri}>` : `_:${iri}`;
          res.write(`${iriNT} <http://www.w3.org/2011/http#statusCode> "${backendRes.statusCode}" <http://purl.org/link-lib/meta> .\r\n`);

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
              res.write(buff);
              res.write(chunk.slice(0, statementTerminal + 1));
              buff = chunk.slice(statementTerminal + 1);
            }
          });

          writeStream.on('end', () => {
            res.write(buff);
            resolve();
          });
        });
        requests.push(backendReq);

        backendReq.on('error', (e) => {
          backendReq.end();
          reject(e);
        });

        setProxyReqHeaders(backendReq, req);
        backendReq.end();
      } catch (e) {
        reject(e);
      }
    }));

  Promise.all(resources)
    .then(() => {
      res.status(HttpStatus.OK);
      res.end();
    }).catch((e) => {
      logging.error(e);
      requests.map(r => r.abort());
      res.status(HttpStatus.INTERNAL_SERVER_ERROR);
      res.end();
    });
};

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
