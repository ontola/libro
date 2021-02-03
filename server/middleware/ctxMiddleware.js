import jwt, { TokenExpiredError } from 'jsonwebtoken';
import uuidv4 from 'uuid/v4';

import { jwtEncryptionToken } from '../config';
import defaultManifest from '../utils/defaultManifest';
import { getBackendManifest } from '../utils/manifest';
import { EXEC_HEADER_NAME } from '../utils/actions';
import {
  ALLOW_CREDENTIALS,
  ALLOW_HEADERS,
  ALLOW_METHODS,
  ALLOW_ORIGIN,
} from '../utils/proxies/helpers';

const BACKEND_TIMEOUT = 3000;

export function enhanceCtx(ctx) {
  ctx.res.locals = { nonce: uuidv4() };
  ctx.req.getCtx = () => ctx;
  if (typeof __VERSION__ !== 'undefined') {
    ctx.response.set('X-FE-Version', __VERSION__);
  }

  ctx.addAction = (action) => {
    ctx.response.set(EXEC_HEADER_NAME, action);
  };

  ctx.getManifest = async (location) => {
    if (!ctx.manifest) {
      try {
        const manifestLocation = location
          || ctx.request.headers.manifest
          || (await ctx.headResponse())?.headers?.get('Manifest');

        if (manifestLocation) {
          ctx.manifest = await getBackendManifest(ctx, manifestLocation);
        } else if (__DEVELOPMENT__) {
          ctx.manifest = defaultManifest(ctx.request.origin);
        }
      } catch (e) {
        if (!__DEVELOPMENT__) {
          throw e;
        }

        ctx.manifest = defaultManifest(ctx.request.origin);
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

      ctx.set(ALLOW_CREDENTIALS, ctx.headResponseResult.headers.get(ALLOW_CREDENTIALS));
      ctx.set(ALLOW_HEADERS, ctx.headResponseResult.headers.get(ALLOW_HEADERS));
      ctx.set(ALLOW_METHODS, ctx.headResponseResult.headers.get(ALLOW_METHODS));
      ctx.set(ALLOW_ORIGIN, ctx.headResponseResult.headers.get(ALLOW_ORIGIN));
    }

    return ctx.headResponseResult;
  };

  ctx.setAccessToken = (token, refreshToken) => {
    ctx.arguTokenData = undefined;

    if (token) {
      if (!refreshToken) {
        throw new Error('refreshToken is missing while accessToken is present');
      }
      ctx.session.userToken = token;
      ctx.session.refreshToken = refreshToken;
    }
  };

  ctx.getFromAccessTokenRaw = (key) => {
    if (!ctx.session.userToken) {
      return undefined;
    }

    if (!ctx.arguTokenData) {
      ctx.arguTokenData = jwt.verify(
        ctx.session.userToken,
        jwtEncryptionToken
      );
    }

    if (!key) {
      return ctx.arguTokenData;
    }

    return ctx.arguTokenData[key];
  };

  ctx.getFromAccessToken = (key) => {
    try {
      return ctx.getFromAccessTokenRaw(key);
    } catch (e) {
      if (e instanceof TokenExpiredError) {
        return undefined;
      }
      throw e;
    }
  };

  ctx.getWebsiteIRI = async () => {
    if (!ctx.websiteIRI) {
      ctx.websiteIRI = ctx.request.headers['website-iri'] || (await ctx.getManifest())?.scope;
    }

    return ctx.websiteIRI;
  };

  return ctx;
}

export default function ctxMiddleware(ctx, next) {
  enhanceCtx(ctx);

  return next();
}
