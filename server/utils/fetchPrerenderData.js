import Stream from 'stream';
import { URL } from 'url';

import HttpStatus from 'http-status-codes';

import { statusCodeHex } from './proxies/helpers';

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

async function isSourceAllowed(ctx, origin) {
  const manifestData = await ctx.getManifest();

  return (manifestData.ontola?.['allowed_external_sources'] || []).includes(origin);
}

const filterAllowedWriteForbiddenMeta = (ctx, write) => async (iri) => {
  const iriHJ = iri.includes('://') ? iri : `_:${iri}`;
  const { origin } = new URL(iri);
  const external = origin !== ctx.request.origin;

  if (external && !await isSourceAllowed(ctx, origin)) {
    write(statusCodeHex(iriHJ, HttpStatus.FORBIDDEN));

    return false;
  }

  return true;
};

const getResources = (ctx, includes) => {
  const { scope } = ctx.manifest;
  const resources = (ctx.manifest.ontola?.preload || []).map(encodeURIComponent);
  if (ctx.request.url?.length > 1) {
    const { origin } = new URL(scope);
    resources.unshift(encodeURIComponent(origin + ctx.request.url));
  }
  if (includes) {
    resources.push(...includes.split(',').map(encodeURIComponent));
  }

  return resources;
};

const fetchPrerenderData = async (ctx, includeResources) => {
  const forbidden = createOutputStream();
  const write = (line) => {
    forbidden.stream.write(JSON.stringify(line));
    forbidden.stream.write('\n');
  };

  const resources = getResources(ctx, includeResources)
    .map((iri) => decodeURIComponent(iri))
    .filter(filterAllowedWriteForbiddenMeta(ctx, write));

  const res = await ctx.api.bulk(resources);
  const text = await res.text();

  return forbidden.data().toString() + text;
};

export default fetchPrerenderData;
