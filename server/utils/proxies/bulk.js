import * as http from 'http';

import HttpStatus from 'http-status-codes';

import logging from '../logging';

import {
  bulkResourceRequest,
  normalizeType,
  setBulkResHeaders,
} from './helpers';

export default (ctx) => {
  ctx.response.append('Content-Type', 'application/n-quads; charset=utf-8');
  ctx.response.body = '';

  const agent = new http.Agent({
    keepAlive: true,
    maxSockets: 30,
    timeout: 30000,
  });

  setBulkResHeaders(ctx.response);

  const [resources, requests] = bulkResourceRequest(
    ctx,
    normalizeType(ctx.request.body.resource)
      .reduce((acc, iri) => (acc.includes(iri) ? acc : acc.concat(iri)), []),
    agent,
    (line) => { ctx.response.body += line; }
  );

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
