import HttpStatus from 'http-status-codes';

import createBulkResourceRequest from '../bulk';
import logging from '../logging';

import {
  normalizeType,
  setBulkResHeaders,
} from './helpers';

/* eslint-disable no-param-reassign */
// eslint-disable-next-line
const createWriter = (ctx) => (line) => {
  if (Array.isArray(line)) {
    ctx.response.body += JSON.stringify(line);
    ctx.response.body += '\n';
  } else {
    ctx.response.body += line;
  }
};
/* eslint-enable no-param-reassign */

export default async (ctx) => {
  ctx.response.append('Content-Type', 'application/hex+x-ndjson; charset=utf-8');
  ctx.response.body = '';

  setBulkResHeaders(ctx.response);

  const [resources, requests, agent] = await createBulkResourceRequest(
    ctx,
    normalizeType(ctx.request.body.resource),
    createWriter(ctx)
  );

  return Promise.all(resources)
    .then(() => {
      ctx.response.status = HttpStatus.OK;
      agent.destroy();
    }).catch((e) => {
      logging.error(e);
      requests.map((r) => r.abort());
      ctx.response.status = HttpStatus.INTERNAL_SERVER_ERROR;
      agent.destroy();
    });
};
