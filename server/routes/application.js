import Stream from 'stream';
import * as http from 'http';

import {
  INTERNAL_SERVER_ERROR,
  SERVICE_UNAVAILABLE,
} from 'http-status-codes';

import * as constants from '../../app/config';
import { isHTMLHeader } from '../utils/http';
import logging from '../utils/logging';
import manifest, { getBackendManifest } from '../utils/manifest';
import {
  bulkResourceRequest,
  isRedirect,
} from '../utils/proxies/helpers';
import { handleRender } from '../utils/render';

const BACKEND_TIMEOUT = 3000;

const fetchPrerenderData = async (ctx, includeResources) => {
  let responseData = Buffer.alloc(0);
  const responseStream = new Stream.Writable();
  // eslint-disable-next-line no-underscore-dangle
  responseStream._write = (chunk, encoding, next) => {
    responseData = Buffer.concat([responseData, chunk]);
    next();
  };
  const dataHeaders = {
    ...ctx.request.headers,
    accept: 'application/hex+x-ndjson',
  };
  const ctxForData = {
    api: ctx.api,
    deviceId: ctx.deviceId,
    req: {
      getCtx: () => ctx,
    },
    request: {
      get: () => {},
      headers: dataHeaders,
    },
    session: ctx.session,
  };

  const { scope } = ctx.manifest;
  const resources = [
    `${scope}`,
    `${scope}/ns/core`,
    `${scope}/c_a`,
    `${scope}/n`,
    `${scope}/search`,
    `${scope}/menus`,
    `${scope}/apex/menus`,
  ];
  if (ctx.request.url?.length > 1) {
    const { origin } = new URL(scope);
    resources.unshift(origin + ctx.request.url);
  }
  if (includeResources) {
    resources.push(...includeResources.split(','));
  }
  const agent = new http.Agent({
    keepAlive: true,
    maxSockets: 30,
    timeout: 30000,
  });

  const [resourceRequests, requests] = bulkResourceRequest(
    ctxForData,
    resources.reduce((acc, iri) => (acc.includes(iri) ? acc : acc.concat(iri)), []),
    agent,
    (line) => {
      if (Array.isArray(line)) {
        responseStream.write(JSON.stringify(line));
        responseStream.write('\n');
      } else {
        responseStream.write(line);
      }
    }
  );

  await Promise.all(resourceRequests)
    .then(() => {
      agent.destroy();
    }).catch((e) => {
      logging.error(e);
      requests.map((r) => r.abort());
      agent.destroy();
    });

  return responseData;
};

const handler = (sendResponse) => async (ctx) => {
  const domain = ctx.request.headers.host.replace(/:.*/, '');

  try {
    const headResponse = await Promise.race([
      ctx.api.headRequest(ctx.request),
      new Promise((_, reject) => setTimeout(() => reject, BACKEND_TIMEOUT)),
    ]);
    ctx.response.status = headResponse.status;

    if (isRedirect(headResponse.status)) {
      const location = headResponse.headers.get('Location');
      if (!location) {
        throw new Error('Trying to redirect with missing Location header.');
      }

      ctx.response.set('Location', location);

      return undefined;
    }

    const auth = headResponse.headers.get('new-authorization');
    if (auth) {
      ctx.session.arguToken = { accessToken: auth };
      ctx.api.userToken = auth;
    }

    const manifestData = await getBackendManifest(ctx, headResponse.headers.get('Manifest'));
    if (manifestData) {
      ctx.manifest = manifestData;
      const responseData = await fetchPrerenderData(ctx, headResponse.headers.get('Include-Resources'));

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

      ctx.response.status = INTERNAL_SERVER_ERROR;
    }

    ctx.manifest = `https://${ctx.request.get('host')}`;

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
