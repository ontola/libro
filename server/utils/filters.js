import * as errors from './errors';
import handleAsyncErrors from './handleAsyncErrors';

const MILLISECONDS = 1000;

/**
 * Fetches a new guest token from the server and stores it in the session.
 * @module
 * @param {function} req The request object to bind the token to.
 * @return {Promise.<Error>} true if the guest token was bound.
 */
async function getGuestToken(req) {
  const response = await req.api.requestGuestToken();
  const body = await response.json();

  if (response.status >= 300) {
    return Promise.reject(new errors.InternalServerErrorError());
  }
  const expiresAt = new Date((body.created_at * MILLISECONDS) + (body.expires_in * MILLISECONDS));
  if (body.token_type !== 'bearer') {
    return Promise.reject(new errors.UnauthorizedError());
  }
  if (expiresAt < Date.now()) {
    return Promise.reject(new errors.UnauthorizedError());
  }

  req.session.arguToken = {
    accessToken: body.access_token,
    expiresAt,
    scope: body.scope,
  };
  return undefined;
}

/**
 * Requires the request to have valid authentication.
 * When the session is empty a guest session is requested.
 * @module
 * @param {function} req -
 * @param {function} res -
 * @param {function} next The function to pass the request to if authentication succeeds
 * @return {undefined}
 */
async function isAuthenticated(req, res, next) {
  const t = req.session.arguToken;
  if (t) {
    const expired = t && new Date(t.expiresAt) < Date.now();
    if (t && !expired) {
      return next();
    }
    res.status(401);
    const status = expired ? 'SESSION_EXPIRED' : 'UNAUTHORIZED';
    return res.send({ status }).end();
  }

  await getGuestToken(req);
  return next();
}

const boundAuthenticated = handleAsyncErrors(isAuthenticated);
export { boundAuthenticated as isAuthenticated };

export function isBackend(req, res, next) {
  const accept = req.get('Accept');
  if (accept && (accept.includes('application/vnd.api+json') || accept.includes('application/json'))) {
    next();
  } else {
    next('route');
  }
}

export function isIframe(req, res, next) {
  if (req.query.iframe === 'positive' || req.headers['x-iframe'] === 'positive') {
    next();
  } else {
    next('route');
  }
}
