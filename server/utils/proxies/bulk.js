import * as http from 'http';
import * as zlib from 'zlib';

import HttpStatus from 'http-status-codes';
import { normalizeType } from 'link-lib';

import {
  EXEC_HEADER_NAME,
  getActions,
} from '../actions';
import logging from '../logging';

import {
  route,
  setProxyReqHeaders,
  setBulkResHeaders,
  newAuthorizationBulk,
} from './helpers';

export default (req, res) => {
  res.append('Content-Type', 'application/n-quads; charset=utf-8');

  const agent = new http.Agent({
    keepAlive: true,
    maxSockets: 3,
    timeout: 30000,
  });

  const requests = [];
  const resources = normalizeType(req.body['resource[]'])
    .reduce((acc, iri) => (acc.includes(iri) ? acc : acc.concat(iri)), [])
    .map(iri => [decodeURIComponent(iri), route(decodeURIComponent(iri), true)])
    .map(([iri, url]) => new Promise((resolve, reject) => {
      try {
        const options = {
          agent,
          headers: {
            Accept: req.headers.accept,
            'Accept-Language': req.headers['accept-language'],
            Connection: 'keep-alive',
            'Content-Length': 0,
            Origin: req.headers.origin,
            Referer: req.headers.referer,
            'User-Agent': req.headers['user-agent'],
            'X-Forwarded-Host': req.headers.host,
            'X-Requested-With': req.headers['x-requested-with'],
          },
          method: 'GET',
          timeout: 30000,
        };
        let buff = Buffer.alloc(0);

        const backendReq = http.request(url, options, (backendRes) => {
          const iriNT = iri.includes('://') ? `<${iri}>` : `_:${iri}`;
          res.write(`${iriNT} <http://www.w3.org/2011/http#statusCode> "${backendRes.statusCode}"^^<http://www.w3.org/2001/XMLSchema#integer> <http://purl.org/link-lib/meta> .\r\n`);

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

          if (!backendRes.headers['content-type'].includes('application/n-quads')) {
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
              res.write(buff);
              res.write(chunk.slice(0, statementTerminal + 1));
              buff = chunk.slice(statementTerminal + 1);
            }
          });

          writeStream.on('end', () => {
            res.write(buff);
            res.write('\n');
            resolve();
          });

          return undefined;
        });
        requests.push(backendReq);

        backendReq.on('error', (e) => {
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

  setBulkResHeaders(res);

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
