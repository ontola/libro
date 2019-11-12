import { EXPIRE_SESSION_ACTION } from '../utils/actions';

/**
 * Requires the request to have valid authentication.
 * When the session is empty a guest session is requested.
 * @module
 * @param {object} ctx -
 * @param {function} next The function to pass the request to if authentication succeeds
 * @return {undefined}
 */
async function authenticationMiddleware(ctx, next) {
  const t = ctx.session.arguToken;

  const expired = t && new Date(t.expiresAt) < Date.now();
  if (expired) {
    // @todo Handle expired token
    ctx.session.arguToken = undefined;
    ctx.addAction(EXPIRE_SESSION_ACTION);
  }

  return next();
}

export default authenticationMiddleware;
