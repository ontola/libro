const FRONTEND_ROUTES = /^\/(login)(\/|$)/;

export default function isBackend(req, _res, next) {
  if (req.originalUrl.match(FRONTEND_ROUTES)) {
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
    return next();
  }
  const contentType = req.get('Content-Type');
  if (contentType && (contentType.includes('application/x-www-form-urlencoded'))) {
    return next();
  }
  return next('route');
}
