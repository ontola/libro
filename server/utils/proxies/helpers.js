import * as http from 'http';
import * as https from 'https';
import fs from 'fs';
import { URL } from 'url';
import * as zlib from 'zlib';

import HttpStatus from 'http-status-codes';
import xsd from '@ontologies/xsd';

import { fileFromCache } from '../cache';
import * as constants from '../../config';
import {
  EXEC_HEADER_NAME,
  getActions,
  hasAction,
  setActionParam,
} from '../actions';
import logging from '../logging';
import { getBackendManifest } from '../manifest';

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
  if (ctx.request.get('Upgrade') !== 'websocket') {
    proxyReq.setHeader('Connection', 'keep-alive');
  }
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

const handleNotAcceptableHJson = (iriHJ, backendRes, write) => {
  if (isRedirect(backendRes.statusCode)) {
    write([iriHJ, 'http://www.w3.org/2002/07/owl#sameAs', backendRes.headers.location, xsd.string.value, '', 'http://purl.org/link-lib/supplant']);
    write([iriHJ, 'http://www.w3.org/2011/http#statusCode', '200', 'http://www.w3.org/2001/XMLSchema#integer', '', 'http://purl.org/link-lib/meta']);
  } else {
    const statusCode = backendRes.statusCode === HttpStatus.OK
      ? HttpStatus.NOT_ACCEPTABLE
      : backendRes.statusCode;
    write([iriHJ, 'http://www.w3.org/2011/http#statusCode', statusCode.toString(), 'http://www.w3.org/2001/XMLSchema#integer', '', 'http://purl.org/link-lib/meta']);
  }
};

const writeResourceBody = (cachedFile, backendRes, write, resolve) => {
  const serveFromCache = cachedFile && backendRes.statusCode === HttpStatus.OK;

  try {
    if (serveFromCache) {
      const file = fs.readFileSync(cachedFile);
      write(Buffer.from(file, 'utf8'));
      write(Buffer.from('\n', 'utf8'));
      backendRes.destroy();
      resolve();

      return true;
    }

    let buff = Buffer.alloc(0);

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

    // let first = true;
    writeStream.on('data', (chunk) => {
      const statementTerminal = chunk.lastIndexOf('\n');
      if (statementTerminal === -1) {
        buff = Buffer.concat([buff, chunk]);
      } else {
        write(buff);
        write(chunk.slice(0, statementTerminal + 1));
        buff = chunk.slice(statementTerminal + 1);
      }
    });

    writeStream.on('end', () => {
      write(buff);
      write('\n');
      backendRes.destroy();
      resolve();
    });

    return true;
  } catch (e) {
    logging.error(e);

    return false;
  }
};

const getRequestOptions = ({
  agent,
  ctx,
  external,
  method,
}) => ({
  agent,
  headers: {
    Accept: ctx.request.headers.accept,
    'Accept-Language': ctx.request.headers['accept-language'] || null,
    Connection: 'keep-alive',
    'Content-Length': 0,
    Origin: external ? null : ctx.request.headers.origin || null,
    Referer: ctx.request.headers.referer || null,
    'User-Agent': ctx.request.headers['user-agent'] || null,
    'X-Forwarded-For': ctx.request.headers['x-forwarded-for'] || null,
    'X-Forwarded-Host': external ? null : ctx.request.headers.host || null,
    'X-Forwarded-Proto': ctx.request.headers['x-forwarded-proto'] || null,
    'X-Forwarded-Ssl': ctx.request.headers['x-forwarded-ssl'] || null,
    'X-Real-Ip': ctx.request.headers['x-real-ip'] || null,
    'X-Requested-With': ctx.request.headers['x-requested-with'] || null,
  },
  method,
  timeout: 30000,
});

async function isSourceAllowed(ctx, origin) {
  if (!ctx.manifest && ctx.request.headers.manifest) {
    ctx.manifest = await getBackendManifest(ctx, ctx.request.headers.manifest);
  }

  return (ctx.manifest.ontola?.['allowed_external_sources'] || []).includes(origin);
}

async function requestForBulk(ctx, iri, agent, write, resolve) {
  const { origin } = new URL(iri);
  const external = origin !== ctx.request.origin;
  const cachedFile = !external && fileFromCache(iri);
  const iriHJ = iri.includes('://') ? iri : `_:${iri}`;

  if (external && !await isSourceAllowed(ctx, origin)) {
    write([iriHJ, 'http://www.w3.org/2011/http#statusCode', HttpStatus.FORBIDDEN.toString(), xsd.integer.value, '', 'http://purl.org/link-lib/meta']);

    return undefined;
  }

  const requestOptions = getRequestOptions({
    agent: external ? null : agent,
    ctx,
    external,
    method: cachedFile ? 'HEAD' : 'GET',
  });

  const httpAgent = external ? https : http;
  const url = external ? decodeURIComponent(iri) : route(decodeURIComponent(iri), true);

  return httpAgent.request(url, requestOptions, (backendRes) => {
    if (!backendRes.headers['content-type']?.includes('application/hex+x-ndjson')) {
      handleNotAcceptableHJson(iriHJ, backendRes, write);
      backendRes.destroy();
      resolve();
    } else if (writeResourceBody(cachedFile, backendRes, write, resolve)) {
      write([iriHJ, 'http://www.w3.org/2011/http#statusCode', backendRes.statusCode.toString(), xsd.integer.value, '', 'http://purl.org/link-lib/meta']);
      if (!external) {
        const actions = getActions(backendRes);
        if (actions.length > 0) {
          for (let i = 0; i < actions.length; i++) {
            write([iriHJ, `http://www.w3.org/2007/ont/httph#${EXEC_HEADER_NAME}`, actions[i].toString(), xsd.string.value, '', 'http://purl.org/link-lib/meta']);
          }
        }
        const redirect = newAuthorizationBulk(ctx, backendRes);
        if (redirect) {
          write([iriHJ, `http://www.w3.org/2007/ont/httph#${EXEC_HEADER_NAME}`, redirect.toString(), xsd.string.value, '', 'http://purl.org/link-lib/meta']);
        }
      }
    } else {
      write([iriHJ, 'http://www.w3.org/2011/http#statusCode', HttpStatus.INTERNAL_SERVER_ERROR.toString(), xsd.integer.value, '', 'http://purl.org/link-lib/meta']);
    }

    return undefined;
  });
}

export function bulkResourceRequest(ctx, iris, agent, write) {
  const requests = [];

  const resources = iris
    .map((iri) => decodeURIComponent(iri))
    .map((iri) => new Promise((resolve, reject) => {
      try {
        requestForBulk(ctx, iri, agent, write, resolve).then((backendReq) => {
          if (typeof backendReq === 'undefined') {
            return resolve();
          }

          requests.push(backendReq);

          backendReq.on('error', (e) => {
            backendReq.end();
            logging.error(e);
            resolve(e);
          });

          backendReq.on('timeout', (e) => {
            backendReq.end();
            logging.error(e);
            resolve(e);
          });

          setProxyReqHeaders(backendReq, ctx);
          backendReq.end();

          return undefined;
        });
      } catch (e) {
        reject(e);
      }
    }));

  return [resources, requests];
}
