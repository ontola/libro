import { TokenExpiredError } from 'jsonwebtoken';

import { MINUTE_SECS, SEC_MS } from '../../app/helpers/date';
import { processTokenRequest } from '../utils/tokens';

const isExpired = (ctx) => {
  try {
    const expiresAt = new Date(ctx.getFromAccessTokenRaw('exp') - MINUTE_SECS) * SEC_MS;

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

  if (ctx.session.userToken) {
    ctx.setAccessToken(ctx.session.userToken, ctx.session.refreshToken);

    if (isExpired(ctx)) {
      const websiteIRI = ctx.getFromAccessTokenExpired('iss');
      ctx.headResponseResult = null;

      if (websiteIRI) {
        await processTokenRequest(
          ctx,
          ctx.api.refreshToken(ctx.session.refreshToken, websiteIRI)
        );
      }
    }
  }

  return next();
}

export default authenticationMiddleware;
