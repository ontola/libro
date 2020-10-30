import pathToRegexp from 'path-to-regexp';

import { dataExtensions } from '../../common/data';
import { redisSettingsNS } from '../config';
import { client } from '../middleware/sessionMiddleware';

import { isDownloadRequest, isHTMLHeader } from './http';
import logging from './logging';

const FRONTEND_ROUTES = /^\/(login)(\/|$)/;

const plainAPIEndpointsKey = [redisSettingsNS, 'runtime.plain_endpoints'].join('.');

export function isBinaryishRequest(next) {
  return async (ctx, nextRoute) => {
    const isBinaryIsh = ctx.request.headers.accept && !isHTMLHeader(ctx.request.headers);

    if (isBinaryIsh || isDownloadRequest(ctx.request.url)) {
      return next(ctx, nextRoute);
    }

    return nextRoute();
  };
}

export async function isPlainAPI() {
  try {
    const endpoints = await client.lrange(plainAPIEndpointsKey, 0, -1);
    const matchers = endpoints.map((e) => pathToRegexp(e));
    logging.debug(`[ROUTING] isPlainAPI: setting routes for endpoints: '${endpoints.join(', ')}'`);

    return (next) => async (ctx, nextRoute) => {
      if (!matchers.find((matcher) => matcher.test(ctx.request.url))) {
        logging.debug(`[ROUTING] isPlainAPI: false for ${ctx.request.url}`);

        return nextRoute();
      }

      logging.debug(`[ROUTING] isPlainAPI: true for ${ctx.request.url}`);

      return next(ctx, nextRoute);
    };
  } catch (e) {
    logging.error(e, 'Received error while determining plain API routes, skipping all');

    return () => async (ctx, nextRoute) => nextRoute();
  }
}

export function isWebsocket(next) {
  return async (ctx, nextRoute) => {
    if (ctx.request.get('Upgrade') === 'websocket') {
      ctx.compress = false;

      return next(ctx, nextRoute);
    }

    return nextRoute();
  };
}

export function isBackend(next) {
  return async (ctx, nextRoute) => {
    if (ctx.request.originalUrl.match(FRONTEND_ROUTES)) {
      logging.debug('[ROUTING] isBackend: false');

      return nextRoute();
    }

    const accept = ctx.request.get('Accept');
    if (accept && (
      accept.includes('text/n3')
      || accept.includes('application/n-triples')
      || accept.includes('application/hex+x-ndjson')
      || accept.includes('application/n-quads')
      || accept.includes('text/turtle')
      || accept.includes('application/vnd.api+json')
      || accept.includes('application/json'))) {
      logging.debug('[ROUTING] isBackend: true');

      return next(ctx, nextRoute);
    }

    const contentType = ctx.request.get('Content-Type');
    if (contentType && (contentType.includes('application/x-www-form-urlencoded'))) {
      logging.debug('[ROUTING] isBackend: true');

      return next(ctx, nextRoute);
    }

    const trailer = ctx.request.url.split('/').pop();
    const extension = trailer?.includes('.') && trailer
      .split('.')
      .pop()
      ?.split('?')
      ?.shift();
    if (extension && dataExtensions.includes(extension)) {
      logging.debug('[ROUTING] dataextension - isBackend: true');

      return next(ctx, nextRoute);
    }

    if (ctx.request.url === '/favicon.ico') {
      logging.debug('[ROUTING] favicon - isBackend: true');

      return next(ctx, nextRoute);
    }

    const referer = ctx.request.get('referer');
    const fetchMode = ctx.request.get('sec-fetch-mode');

    if (referer && ctx.request.host && new URL(referer).host !== ctx.request.host && fetchMode === 'cors') {
      logging.debug('[ROUTING] DIFFERENT ORIGIN - isBackend: true', referer, ctx.request.host);

      return next(ctx, nextRoute);
    }

    logging.debug('[ROUTING] isBackend: false');

    return nextRoute();
  };
}
