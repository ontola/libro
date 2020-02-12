import * as http from 'http';

import { bulkResourceRequest } from './proxies/helpers';

export function createBulkResourceRequest(ctx, resources, writer) {
  const agent = new http.Agent({
    keepAlive: true,
    maxSockets: 30,
    timeout: 30000,
  });

  const [resourceData, requests] = bulkResourceRequest(
    ctx,
    Array.from(new Set(resources)),
    agent,
    writer
  );

  return [resourceData, requests, agent];
}
