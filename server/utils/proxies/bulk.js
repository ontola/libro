import * as http from 'http';
import * as zlib from 'zlib';

import HttpStatus from 'http-status-codes';

import * as constants from '../../config';
import {
  EXEC_HEADER_NAME,
  getActions,
} from '../actions';
import logging from '../logging';

import {
  route,
  setProxyReqHeaders,
  setBulkResHeaders, newAuthorizationBulk,
} from './helpers';

export default (req, res) => {
  res.append('Content-Type', 'application/n-quads; charset=utf-8');

  const bulkUrl = new URL(req.url, constants.FRONTEND_URL);
  const requests = [];
  const resources = bulkUrl
    .searchParams
    .getAll('resource')
    .reduce((acc, iri) => (acc.includes(iri) ? acc : acc.concat(iri)), [])
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

  setBulkResHeaders(res);

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
