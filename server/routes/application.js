import {
  BAD_GATEWAY,
  INTERNAL_SERVER_ERROR,
  NOT_FOUND,
  OK,
  SERVICE_UNAVAILABLE,
  TEMPORARY_REDIRECT,
} from 'http-status-codes';

import * as constants from '../../app/config';
import fetchPrerenderData from '../utils/fetchPrerenderData';
import { isHTMLHeader } from '../utils/http';
import logging from '../utils/logging';
import manifest from '../utils/manifest';
import { isRedirect } from '../utils/proxies/helpers';
import { handleRender } from '../utils/render';

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

    if (headResponse.status === NOT_FOUND) {
      throw new Error('NO_TENANT');
    } else {
      throw new Error(`No manifest data available for ${ctx.request.url}. Head response: ${headResponse.status}.`);
    }
  } catch (e) {
    if (typeof e === 'undefined') {
      // Timeout finished first
      ctx.response.status = SERVICE_UNAVAILABLE;
    } if (e.message === 'NO_TENANT') {
      ctx.response.status = NOT_FOUND;
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
