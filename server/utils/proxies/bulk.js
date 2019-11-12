import * as http from 'http';
import * as zlib from 'zlib';
import fs from 'fs';

import MD5 from 'md5.js';
import HttpStatus from 'http-status-codes';

import {
  EXEC_HEADER_NAME,
  getActions,
} from '../actions';
import logging from '../logging';
import { cacheDirectory } from '../../config';

import {
  newAuthorizationBulk,
  normalizeType,
  route,
  setBulkResHeaders,
  setProxyReqHeaders,
} from './helpers';

const fileFromCache = (iri) => {
  const hashId = new MD5().update(iri.toString()).digest('hex');
  const filePath = `${cacheDirectory}/latest/${hashId.match(/.{1,8}/g).join('/')}/latest/index.nq`;
  if (fs.existsSync(filePath)) {
    return filePath;
  }

  return undefined;
};

export default (ctx) => {
  ctx.response.append('Content-Type', 'application/n-quads; charset=utf-8');
  ctx.response.body = '';

  const agent = new http.Agent({
    keepAlive: true,
    maxSockets: 30,
    timeout: 30000,
  });

  setBulkResHeaders(ctx.response);

  const requests = [];
  const resources = normalizeType(ctx.request.body.resource)
    .reduce((acc, iri) => (acc.includes(iri) ? acc : acc.concat(iri)), [])
    .map(iri => [decodeURIComponent(iri), route(decodeURIComponent(iri), true)])
    .map(([iri, url]) => new Promise((resolve, reject) => {
      try {
        const cachedFile = fileFromCache(iri);
        const options = {
          agent,
          headers: {
            Accept: ctx.request.headers.accept,
            'Accept-Language': ctx.request.headers['accept-language'] || null,
            Connection: 'keep-alive',
            'Content-Length': 0,
            Origin: ctx.request.headers.origin || null,
            Referer: ctx.request.headers.referer || null,
            'User-Agent': ctx.request.headers['user-agent'] || null,
            'X-Forwarded-For': ctx.request.headers['x-forwarded-for'] || null,
            'X-Forwarded-Host': ctx.request.headers.host,
            'X-Forwarded-Proto': ctx.request.headers['x-forwarded-proto'] || null,
            'X-Forwarded-Ssl': ctx.request.headers['x-forwarded-ssl'] || null,
            'X-Real-Ip': ctx.request.headers['x-real-ip'] || null,
            'X-Requested-With': ctx.request.headers['x-requested-with'] || null,
          },
          method: cachedFile ? 'HEAD' : 'GET',
          timeout: 30000,
        };
        let buff = Buffer.alloc(0);

        const backendReq = http.request(url, options, (backendRes) => {
          const iriNT = iri.includes('://') ? `<${iri}>` : `_:${iri}`;
          ctx.response.body += `${iriNT} <http://www.w3.org/2011/http#statusCode> "${backendRes.statusCode}"^^<http://www.w3.org/2001/XMLSchema#integer> <http://purl.org/link-lib/meta> .\r\n`;
          const serveFromCache = cachedFile && backendRes.statusCode === HttpStatus.OK;

          const actions = getActions(backendRes);
          if (actions.length > 0) {
            for (let i = 0; i < actions.length; i++) {
              ctx.response.body += `${iriNT} <http://www.w3.org/2007/ont/httph#${EXEC_HEADER_NAME}> "${actions[i]}" <http://purl.org/link-lib/meta> .\r\n`;
            }
          }

          const redirect = newAuthorizationBulk(ctx, backendRes);
          if (redirect) {
            ctx.response.body += `${iriNT} <http://www.w3.org/2007/ont/httph#${EXEC_HEADER_NAME}> "${redirect}" <http://purl.org/link-lib/meta> .\r\n`;
          }

          if (!backendRes.headers['content-type']?.includes('application/n-quads')) {
            return resolve();
          }

          if (serveFromCache) {
            const file = fs.readFileSync(cachedFile);
            ctx.response.body += Buffer.from(file, 'utf8');
            ctx.response.body += Buffer.from('\n', 'utf8');
            backendRes.destroy();
            resolve();
          } else {
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
                ctx.response.body += buff;
                ctx.response.body += chunk.slice(0, statementTerminal + 1);
                buff = chunk.slice(statementTerminal + 1);
              }
            });

            writeStream.on('end', () => {
              ctx.response.body += buff;
              ctx.response.body += Buffer.from('\n', 'utf8');
              backendRes.destroy();
              resolve();
            });
          }

          return undefined;
        });
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

        setProxyReqHeaders(backendReq, ctx.req);
        backendReq.end();
      } catch (e) {
        reject(e);
      }
    }));

  return Promise.all(resources)
    .then(() => {
      ctx.response.status = HttpStatus.OK;
      agent.destroy();
    }).catch((e) => {
      logging.error(e);
      requests.map(r => r.abort());
      ctx.response.status = HttpStatus.INTERNAL_SERVER_ERROR;
      agent.destroy();
    });
};
