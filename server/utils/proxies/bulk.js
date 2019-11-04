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

export default (req, res) => {
  res.append('Content-Type', 'application/n-quads; charset=utf-8');

  const agent = new http.Agent({
    keepAlive: true,
    maxSockets: 3,
    timeout: 30000,
  });

  setBulkResHeaders(res);

  const requests = [];
  const resources = normalizeType(req.body['resource[]'])
    .reduce((acc, iri) => (acc.includes(iri) ? acc : acc.concat(iri)), [])
    .map(iri => [decodeURIComponent(iri), route(decodeURIComponent(iri), true)])
    .map(([iri, url]) => new Promise((resolve, reject) => {
      try {
        const cachedFile = fileFromCache(iri);
        const options = {
          agent,
          headers: {
            Accept: req.headers.accept,
            'Accept-Language': req.headers['accept-language'] || null,
            Connection: 'keep-alive',
            'Content-Length': 0,
            Origin: req.headers.origin || null,
            Referer: req.headers.referer || null,
            'User-Agent': req.headers['user-agent'] || null,
            'X-Forwarded-For': req.headers['x-forwarded-for'] || null,
            'X-Forwarded-Host': req.headers.host,
            'X-Forwarded-Proto': req.headers['x-forwarded-proto'] || null,
            'X-Forwarded-Ssl': req.headers['x-forwarded-ssl'] || null,
            'X-Real-Ip': req.headers['x-real-ip'] || null,
            'X-Requested-With': req.headers['x-requested-with'] || null,
          },
          method: cachedFile ? 'HEAD' : 'GET',
          timeout: 30000,
        };
        let buff = Buffer.alloc(0);

        const backendReq = http.request(url, options, (backendRes) => {
          const iriNT = iri.includes('://') ? `<${iri}>` : `_:${iri}`;
          res.write(`${iriNT} <http://www.w3.org/2011/http#statusCode> "${backendRes.statusCode}"^^<http://www.w3.org/2001/XMLSchema#integer> <http://purl.org/link-lib/meta> .\r\n`);
          const serveFromCache = cachedFile && backendRes.statusCode === HttpStatus.OK;

          const actions = getActions(backendRes);
          if (actions.length > 0) {
            for (let i = 0; i < actions.length; i++) {
              res.write(`${iriNT} <http://www.w3.org/2007/ont/httph#${EXEC_HEADER_NAME}> "${actions[i]}" <http://purl.org/link-lib/meta> .\r\n`);
            }
          }

          const redirect = newAuthorizationBulk(req, backendRes);
          if (redirect) {
            res.write(`${iriNT} <http://www.w3.org/2007/ont/httph#${EXEC_HEADER_NAME}> "${redirect}" <http://purl.org/link-lib/meta> .\r\n`);
          }

          if (!backendRes.headers['content-type']?.includes('application/n-quads')) {
            return resolve();
          }

          if (serveFromCache) {
            const file = fs.readFileSync(cachedFile);
            res.write(Buffer.from(file, 'utf8'));
            res.write(Buffer.from('\n', 'utf8'));
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
                res.write(buff);
                res.write(chunk.slice(0, statementTerminal + 1));
                buff = chunk.slice(statementTerminal + 1);
              }
            });

            writeStream.on('end', () => {
              res.write(buff);
              res.write(Buffer.from('\n', 'utf8'));
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
      agent.destroy();
    }).catch((e) => {
      logging.error(e);
      requests.map(r => r.abort());
      res.status(HttpStatus.INTERNAL_SERVER_ERROR);
      res.end();
      agent.destroy();
    });
};
