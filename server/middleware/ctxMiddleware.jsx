import jwt from 'jsonwebtoken';
import uuidv4 from 'uuid/v4';

import { jwtEncryptionToken } from '../config';
import { getBackendManifest } from '../utils/manifest';
import { EXEC_HEADER_NAME } from '../utils/actions';
import { NEW_AUTHORIZATION_HEADER, NEW_REFRESH_TOKEN_HEADER } from '../utils/proxies/helpers';

const BACKEND_TIMEOUT = 3000;

export default function ctxMiddleware(ctx, next) {
  ctx.res.locals = { nonce: uuidv4() };
  ctx.req.getCtx = () => ctx;
  ctx.response.set('X-FE-Version', __VERSION__);

  ctx.addAction = (action) => {
    ctx.response.set(EXEC_HEADER_NAME, action);
  };

  ctx.getManifest = async (location) => {
    if (!ctx.manifest) {
      const manifestLocation = location
        || ctx.request.headers.manifest
        || (await ctx.headResponse()).headers.get('Manifest');
      if (manifestLocation) {
        ctx.manifest = await getBackendManifest(ctx, manifestLocation);
      }
    }

    return ctx.manifest;
  };

  ctx.headResponse = async () => {
    if (!ctx.headResponseResult) {
      ctx.headResponseResult = await Promise.race([
        ctx.api.headRequest(ctx.request),
        new Promise((_, reject) => setTimeout(() => reject, BACKEND_TIMEOUT)),
      ]);

      const auth = ctx.headResponseResult.headers.get(NEW_AUTHORIZATION_HEADER);
      const refreshToken = ctx.headResponseResult.headers.get(NEW_REFRESH_TOKEN_HEADER);
      ctx.setAccessToken(auth, refreshToken);
    }

    return ctx.headResponseResult;
  };

  ctx.setAccessToken = (token, refreshToken) => {
    ctx.arguTokenData = undefined;

    if (token) {
      if (!refreshToken) {
        throw new Error('refreshToken is missing while accessToken is present');
      }
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

  return next();
}
