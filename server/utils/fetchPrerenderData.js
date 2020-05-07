import Stream from 'stream';

import createBulkResourceRequest from './bulk';
import createDataContext from './createDataContext';
import logging from './logging';

const defaultResources = (scope) => [
  `${scope}`,
  `${scope}/ns/core`,
  `${scope}/c_a`,
  `${scope}/banners`,
  `${scope}/n`,
  `${scope}/search`,
  `${scope}/menus`,
  `${scope}/apex/menus`,
];

const createOutputStream = () => {
  let data = Buffer.alloc(0);
  const stream = new Stream.Writable();
  // eslint-disable-next-line no-underscore-dangle
  stream._write = (chunk, encoding, next) => {
    data = Buffer.concat([data, chunk]);
    next();
  };

  return {
    data: () => data,
    stream,
  };
};

const createWriter = (stream) => (line) => {
  if (Array.isArray(line)) {
    stream.write(JSON.stringify(line));
    stream.write('\n');
  } else {
    stream.write(line);
  }
};

const getResources = (ctx, includes) => {
  const { scope } = ctx.manifest;
  const resources = defaultResources(ctx.manifest.scope);
  if (ctx.request.url?.length > 1) {
    const { origin } = new URL(scope);
    resources.unshift(origin + ctx.request.url);
  }
  if (includes) {
    resources.push(...includes.split(','));
  }

  return resources;
};

const fetchPrerenderData = async (ctx, includeResources) => {
  const output = createOutputStream();

  const [resourceRequests, requests, agent] = await createBulkResourceRequest(
    createDataContext(ctx),
    getResources(ctx, includeResources),
    createWriter(output.stream)
  );

  await Promise.all(resourceRequests)
    .then(() => {
      agent.destroy();
    }).catch((e) => {
      logging.error(e);
      requests.map((r) => r.abort());
      agent.destroy();
    });

  return output.data();
};

export default fetchPrerenderData;
