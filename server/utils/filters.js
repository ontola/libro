import pathToRegexp from 'path-to-regexp';

import { redisSettingsNS } from '../config';
import { client } from '../middleware/sessionMiddleware';

import logging from './logging';

const FRONTEND_ROUTES = /^\/(login)(\/|$)/;

const dataExtensions = ['json', 'nq', 'nt', 'n3', 'rdf', 'ttl'];

const plainAPIEndpointsKey = [redisSettingsNS, 'runtime.plain_endpoints'].join('.');

export async function isPlainAPI() {
  try {
    const endpoints = await client.lrange(plainAPIEndpointsKey, 0, -1);
    const matchers = endpoints.map(e => pathToRegexp(e));
    logging.debug(`[ROUTING] isPlainAPI: setting routes for endpoints: '${endpoints.join(', ')}'`);

    return (req, res, next) => {
      if (!matchers.find(matcher => matcher.test(req.url))) {
        logging.debug(`[ROUTING] isPlainAPI: false for ${req.url}`);
        return next('route');
      }

      logging.debug(`[ROUTING] isPlainAPI: true for ${req.url}`);
      return next();
    };
  } catch (e) {
    logging.error(e, 'Received error while determining plain API routes, skipping all');

    return (req, res, next) => {
      next('route');
    };
  }
}

export default function isBackend(req, _res, next) {
  if (req.originalUrl.match(FRONTEND_ROUTES)) {
    logging.debug('[ROUTING] isBackend: false');
    return next('route');
  }

  const accept = req.get('Accept');
  if (accept && (
    accept.includes('text/n3')
    || accept.includes('application/n-triples')
    || accept.includes('application/n-quads')
    || accept.includes('text/turtle')
    || accept.includes('application/vnd.api+json')
    || accept.includes('application/json'))) {
    logging.debug('[ROUTING] isBackend: true');

    return next();
  }

  const contentType = req.get('Content-Type');
  if (contentType && (contentType.includes('application/x-www-form-urlencoded'))) {
    logging.debug('[ROUTING] isBackend: true');
    return next();
  }

  const extension = req.url.split('/').pop()?.split('.')?.pop()?.split('?')?.shift();
  if (extension && dataExtensions.includes(extension)) {
    return next();
  }

  if (req.url === '/favicon.ico') {
    return next();
  }

  logging.debug('[ROUTING] isBackend: false');
  return next('route');
}
