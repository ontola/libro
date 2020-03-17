import * as httpStatus from 'http-status-codes';
import jwt, { TokenExpiredError } from 'jsonwebtoken';

import { jwtEncryptionToken } from '../config';
import { MINUTE_SECS, SEC_MS } from '../../app/helpers/date';

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

  ctx.setAccessToken = (token, refreshToken) => {
    ctx.arguTokenData = undefined;

    if (token) {
      ctx.session.arguToken = token;
      ctx.session.arguRefreshToken = refreshToken;
      ctx.api.userToken = token;
    }
  };

  ctx.getFromAccessToken = (key) => {
    if (!ctx.session.arguToken) {
      return undefined;
    }

    if (!ctx.arguTokenData) {
      ctx.arguTokenData = jwt.verify(
        ctx.session.arguToken,
        jwtEncryptionToken
      );
    }

    if (!key) {
      return ctx.arguTokenData;
    }

    return ctx.arguTokenData[key];
  };

  if (ctx.session.arguToken) {
    ctx.setAccessToken(ctx.session.arguToken, ctx.session.arguRefreshToken);

    const websiteIRI = ctx.request.headers['website-iri'] || (await ctx.getManifest())?.scope;

    if (isExpired(ctx) && websiteIRI) {
      const response = await ctx.api.refreshToken(
        ctx.session.arguRefreshToken,
        websiteIRI
      );
      const json = await response.json();
      if (ctx.response.status === httpStatus.OK) {
        ctx.setAccessToken(json.access_token, json.refresh_token);
      } else {
        throw new Error(`Unhandled server status code '${response.status}'\n${json}`);
      }
    }
  }

  return next();
}

export default authenticationMiddleware;
