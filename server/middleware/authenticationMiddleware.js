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
  ctx.setAccessToken = (token, refreshToken) => {
    if (token) {
      ctx.session.arguToken = token;
      ctx.session.arguRefreshToken = refreshToken;
      ctx.api.userToken = token;
    }
  };

  if (ctx.session) {
    ctx.setAccessToken(ctx.session.arguToken, ctx.session.arguRefreshToken);
  }

  const expired = ctx.session.arguToken && new Date(ctx.session.arguToken.expiresAt) < Date.now();
  if (expired) {
    // @todo Handle expired token
    ctx.session.arguToken = undefined;
    ctx.addAction(EXPIRE_SESSION_ACTION);
  }

  return next();
}

export default authenticationMiddleware;
