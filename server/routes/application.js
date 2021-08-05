import {
  BAD_GATEWAY,
  INTERNAL_SERVER_ERROR,
  NOT_FOUND,
  OK,
  SERVICE_UNAVAILABLE,
  TEMPORARY_REDIRECT,
} from 'http-status-codes';

import { assetsHost, standaloneLibro } from '../config';
import defaultManifest from '../utils/defaultManifest';
import fetchPrerenderData from '../utils/fetchPrerenderData';
import { isHTMLHeader } from '../utils/http';
import logging from '../utils/logging';
import manifest from '../utils/manifest';
import {
  NEW_AUTHORIZATION_HEADER,
  NEW_REFRESH_TOKEN_HEADER,
  isRedirect,
} from '../utils/proxies/helpers';
import { handleRender } from '../utils/render';

const handler = (sendResponse) => async (ctx) => {
  const domain = ctx.request.headers.host.replace(/:.*/, '');

  if (standaloneLibro) {
    ctx.manifest = defaultManifest(ctx.request.origin);

    return sendResponse(ctx, domain, '');
  }

  try {
    const headResponse = await ctx.headResponse();
    const auth = headResponse.headers.get(NEW_AUTHORIZATION_HEADER);
    const refreshToken = headResponse.headers.get(NEW_REFRESH_TOKEN_HEADER);
    ctx.setAccessToken(auth, refreshToken);
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

    if (headResponse.status === NOT_FOUND) {
      throw new Error('NO_TENANT');
    } else {
      throw new Error(`No manifest data available for ${ctx.request.url}. Head response: ${headResponse.status}.`);
    }
  } catch (e) {
    if (typeof e === 'undefined') {
      // Timeout finished first
      ctx.response.status = SERVICE_UNAVAILABLE;
    }

    if (e.message === 'NO_TENANT') {
      ctx.response.status = NOT_FOUND;
    } else {
      logging.error(e, ctx.bugsnag ? 'Notifying' : 'Bugsnag client not present');

      if (ctx.bugsnag) {
        ctx.bugsnag.notify(e);
      }

      ctx.response.status = e.message.includes('ECONNREFUSED') ? BAD_GATEWAY : INTERNAL_SERVER_ERROR;
    }

    if (__DEVELOPMENT__) {
      return sendResponse(ctx, domain, '');
    }

    ctx.manifest = defaultManifest(ctx.request.origin);

    return sendResponse(ctx, domain, '');
  }
};

export default function application(port) {
  const PRELOAD_HEADERS = [
    `<${assetsHost}/static/preloader.css>; rel=preload; as=style`,
    manifest['main.js'] && `<${assetsHost}${manifest['main.js']}>; rel=preload; as=script`,
    __PRODUCTION__ && manifest['main.css'] && `<${assetsHost}${manifest['main.css']}>; rel=preload; as=style`,
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
