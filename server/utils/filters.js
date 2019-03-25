import logging from './logging';

const FRONTEND_ROUTES = /^\/(login)(\/|$)/;

const dataExtensions = ['json', 'n-quads', 'n-triples', 'n3', 'rdf', 'ttl'];

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

  logging.debug('[ROUTING] isBackend: false');
  return next('route');
}
