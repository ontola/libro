import { TokenExpiredError } from 'jsonwebtoken';

import { MINUTE_SECS, SEC_MS } from '../../app/helpers/date';
import { processTokenRequest } from '../utils/tokens';

const isExpired = (ctx) => {
  try {
    const expiresAt = new Date(ctx.getFromAccessToken('exp') - MINUTE_SECS) * SEC_MS;

    return expiresAt < Date.now();
  } catch (e) {
    if (e instanceof TokenExpiredError) {
      return true;
    }
    throw e;
  }
};

/**
 * Requires the request to have valid authentication.
 * @module
 * @param {object} ctx -
 * @param {function} next The function to pass the request to if authentication succeeds
 * @return {undefined}
 */
async function authenticationMiddleware(ctx, next) {
  ctx.arguTokenData = undefined;

  if (ctx.session.arguToken) {
    ctx.setAccessToken(ctx.session.arguToken, ctx.session.arguRefreshToken);

    if (isExpired(ctx) && ctx.getWebsiteIRI()) {
      await processTokenRequest(
        ctx,
        ctx.api.refreshToken(ctx.session.arguRefreshToken, await ctx.getWebsiteIRI())
      );
    }
  }

  return next();
}

export default authenticationMiddleware;
