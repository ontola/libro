import Stream from 'stream';

import {
  BAD_GATEWAY,
  INTERNAL_SERVER_ERROR,
  OK,
  SERVICE_UNAVAILABLE,
  TEMPORARY_REDIRECT,
} from 'http-status-codes';

import * as constants from '../../app/config';
import createBulkResourceRequest from '../utils/bulk';
import { isHTMLHeader } from '../utils/http';
import logging from '../utils/logging';
import manifest from '../utils/manifest';
import { isRedirect } from '../utils/proxies/helpers';
import { handleRender } from '../utils/render';

const defaultResources = (scope) => [
  `${scope}`,
  `${scope}/ns/core`,
  `${scope}/c_a`,
  `${scope}/n`,
  `${scope}/search`,
  `${scope}/menus`,
  `${scope}/apex/menus`,
];

const createDataContext = (ctx) => {
  const dataHeaders = {
    ...ctx.request.headers,
    accept: 'application/hex+x-ndjson',
  };

  return {
    api: ctx.api,
    deviceId: ctx.deviceId,
    manifest: ctx.manifest,
    req: {
      getCtx: () => ctx,
    },
    request: {
      get: () => {},
      headers: dataHeaders,
      origin: ctx.request.origin,
    },
    session: ctx.session,
  };
};

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

const handler = (sendResponse) => async (ctx) => {
  const domain = ctx.request.headers.host.replace(/:.*/, '');

  try {
    const headResponse = await ctx.headResponse();
    ctx.response.status = headResponse.status;

    if (isRedirect(headResponse.status)) {
      const location = headResponse.headers.get('Location');
      if (!location) {
        throw new Error('Trying to redirect with missing Location header.');
      }

      ctx.response.set('Location', location);
      ctx.response.status = TEMPORARY_REDIRECT;

      return undefined;
    }

    const manifestData = await ctx.getManifest();
    if (manifestData) {
      const responseData = await fetchPrerenderData(ctx, headResponse.headers.get('Include-Resources'));
      ctx.response.status = OK;

      return sendResponse(ctx, domain, responseData);
    }

    return undefined;
  } catch (e) {
    if (typeof e === 'undefined') {
      // Timeout finished first
      ctx.response.status = SERVICE_UNAVAILABLE;
    } else {
      logging.error(e, ctx.bugsnag ? 'Notifying' : 'Bugsnag client not present');
      if (ctx.bugsnag) {
        ctx.bugsnag.notify(e);
      }

      ctx.response.status = e.message.includes('ECONNREFUSED') ? BAD_GATEWAY : INTERNAL_SERVER_ERROR;
    }

    ctx.manifest = {
      icons: [],
      ontola: {},
      scope: `https://${ctx.request.get('host')}`,
      serviceworker: {},
    };

    return sendResponse(ctx, domain, '');
  }
};

export default function application(port) {
  const PRELOAD_HEADERS = [
    `<${constants.ASSETS_HOST}/static/preloader.css>; rel=preload; as=style`,
    manifest['main.js'] && `<${constants.ASSETS_HOST}${manifest['main.js']}>; rel=preload; as=script`,
    __PRODUCTION__ && manifest['main.css'] && `<${constants.ASSETS_HOST}${manifest['main.css']}>; rel=preload; as=style`,
  ].filter(Boolean);

  const sendResponse = (ctx, domain, data) => {
    if (isHTMLHeader(ctx.request.headers)) {
      ctx.set('Link', PRELOAD_HEADERS);
    }
    ctx.set('Vary', 'Accept,Accept-Encoding,Authorization,Content-Type');

    return handleRender(ctx, port, domain, data);
  };

  return handler(sendResponse);
}
