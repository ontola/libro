import Stream from 'stream';

import {
  INTERNAL_SERVER_ERROR,
  SERVICE_UNAVAILABLE,
} from 'http-status-codes';

import * as constants from '../../app/config';
import { isHTMLHeader } from '../utils/http';
import logging from '../utils/logging';
import manifest from '../utils/manifest';
import {
  bulkResourceRequest,
  isRedirect,
  route,
} from '../utils/proxies/helpers';
import { handleRender } from '../utils/render';
import processResponse from '../api/internal/statusHandler';
import { isSuccess } from '../../app/helpers/arguHelpers';

const BACKEND_TIMEOUT = 3000;

const getManifest = async (ctx, manifestHeader) => {
  const headerRes = await ctx.api.fetchRaw(
    ctx.api.userToken || ctx.api.serviceGuestToken,
    {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        ...ctx.api.proxySafeHeaders(),
      },
      method: 'GET',
      path: manifestHeader,
      redirect: 'error',
    }
  );
  const processed = await processResponse(headerRes);

  return processed.json();
};

const getManifestData = async (ctx, manifestHeader) => {
  if (!manifestHeader) {
    if (isSuccess(ctx.response.status)) {
      ctx.response.status = INTERNAL_SERVER_ERROR;
    }
    throw new Error('No Manifest url in head.');
  }

  return getManifest(ctx, manifestHeader);
};

const fetchPrerenderData = async (ctx, manifestData) => {
  let responseData = Buffer.alloc(0);
  const responseStream = new Stream.Writable();
  // eslint-disable-next-line no-underscore-dangle
  responseStream._write = (chunk, encoding, next) => {
    responseData = Buffer.concat([responseData, chunk]);
    next();
  };
  const dataHeaders = {
    ...ctx.request.headers,
    accept: 'application/n-quads',
  };
  const ctxForData = {
    api: ctx.api,
    deviceId: ctx.deviceId,
    req: {
      getCtx: () => ctx,
    },
    request: {
      headers: dataHeaders,
    },
    session: ctx.session,
  };
  const resources = [
    `${manifestData.scope}`,
    `${manifestData.scope}/ns/core`,
    `${manifestData.scope}/c_a`,
    `${manifestData.scope}/n`,
    `${manifestData.scope}/search`,
    `${manifestData.scope}/menus`,
    `${manifestData.scope}/apex/menus`,
  ];
  if (ctx.request.path?.length > 1) {
    const { origin } = new URL(manifestData.scope);
    resources.unshift(origin + ctx.request.path);
  }

  const resourceRequests = resources
    .reduce((acc, iri) => (acc.includes(iri) ? acc : acc.concat(iri)), [])
    .map(iri => bulkResourceRequest(ctxForData, iri, route(iri, true), responseStream));

  await Promise.all(resourceRequests);

  return responseData;
};

const handler = sendResponse => async (ctx) => {
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

    const manifestData = await getManifestData(ctx, headResponse.headers.get('Manifest'));
    const responseData = await fetchPrerenderData(ctx, manifestData);

    return sendResponse(ctx, domain, manifestData, responseData);
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

    return sendResponse(ctx, domain, `https://${ctx.request.get('host')}`, '');
  }
};


export default function application(port) {
  const PRELOAD_HEADERS = [
    `<${constants.ASSETS_HOST}/static/preloader.css>; rel=preload; as=style`,
    manifest['main.js'] && `<${constants.ASSETS_HOST}${manifest['main.js']}>; rel=preload; as=script`,
    __PRODUCTION__ && manifest['main.css'] && `<${constants.ASSETS_HOST}${manifest['main.css']}>; rel=preload; as=style`,
  ].filter(Boolean);

  const sendResponse = (ctx, domain, manifestData, data) => {
    if (isHTMLHeader(ctx.request.headers)) {
      ctx.set('Link', PRELOAD_HEADERS);
    }
    ctx.set('Vary', 'Accept,Accept-Encoding,Authorization,Content-Type');

    return handleRender(ctx, port, domain, manifestData, data);
  };

  return handler(sendResponse);
}
