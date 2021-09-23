import { URL } from 'url';

import merge from 'deepmerge';
import jwt, { TokenExpiredError } from 'jsonwebtoken';
import uuidv4 from 'uuid/v4';

import {
  jwtEncryptionToken,
  redisSettingsNS,
  standaloneLibro,
} from '../config';
import { EXEC_HEADER_NAME } from '../utils/actions';
import defaultManifest from '../utils/defaultManifest';
import logging from '../utils/logging';
import { getBackendManifest } from '../utils/manifest';
import {
  ALLOW_CREDENTIALS,
  ALLOW_HEADERS,
  ALLOW_METHODS,
  ALLOW_ORIGIN,
} from '../utils/proxies/helpers';

import { client } from './sessionMiddleware';

const BACKEND_TIMEOUT = 3000;

const stemIri = (iri) => {
  const url = new URL(iri);

  return `${url.origin}${url.pathname}`;
};

export function enhanceCtx(ctx) {
  ctx.res.locals = { nonce: uuidv4() };
  ctx.req.getCtx = () => ctx;

  if (typeof __VERSION__ !== 'undefined') {
    ctx.response.set('X-FE-Version', __VERSION__);
  }

  ctx.addAction = (action) => {
    ctx.response.set(EXEC_HEADER_NAME, action);
  };

  /**
   * Retrieves the document manifest from redis, if any.
   */
  ctx.documentManifestOverrides = async () => {
    if (ctx._documentManifestOverrides !== undefined) {
      return ctx._documentManifestOverrides;
    }

    try {
      const docKey = await ctx.documentRoute();

      const manifestOverride = await client.hget(docKey, 'manifestOverride');

      ctx._documentManifestOverrides = JSON.parse(manifestOverride);
    } catch (e) {
      logging.error(e);
      ctx._documentManifestOverrides = null;
    }

    return ctx._documentManifestOverrides;
  };

  /**
   * Retrieves the document manifest from redis, if any.
   */
  ctx.documentManifest = async () => {
    if (ctx._documentManifest !== undefined) {
      return ctx._documentManifest;
    }

    try {
      const overrides = await ctx.documentManifestOverrides();
      ctx._documentManifest = merge(defaultManifest(ctx.request.href), overrides ?? {});
    } catch (e) {
      logging.error(e);
      ctx._documentManifest = null;
    }

    return ctx._documentManifest;
  };

  /**
   * Retrieves the source for a document.
   */
  ctx.documentSource = async () => {
    if (ctx._documentSource !== undefined) {
      return ctx._documentSource;
    }

    try {
      const docKey = await ctx.documentRoute();
      ctx._documentSource = await client.hget(docKey, 'source');
    } catch (e) {
      logging.error(e);
      ctx._documentSource = null;
    }

    return ctx._documentSource;
  }

  /**
   * Resolves a document key if the current route falls within a Libro document.
   */
  ctx.documentRoute = async () => {
    if (ctx._documentRoute !== undefined) {
      return ctx._documentRoute;
    }

    try {
      const startRoute = `${redisSettingsNS}.routes.start.`;

      const startKeys = await client.keys(`${startRoute}*`);
      const strippedKeys = startKeys.map((key) => key.replace(startRoute, ''));
      const result = strippedKeys.find((key) => stemIri(ctx.request.href) === key
        || ctx.request.href.startsWith(`${key}/`));

      if (!result) {
        ctx._documentRoute = null;
      }

      ctx._documentRoute = client.get(`${startRoute}${result}`);
    } catch (e) {
      logging.error(e);
      ctx._documentRoute = null;
    }

    return ctx._documentRoute;
  };

  /**
   * Retrieves the sitemap for a document.
   */
  ctx.documentSitemap = async () => {
    if (ctx._documentSitemap !== undefined) {
      return ctx._documentSitemap;
    }

    try {
      const docKey = await ctx.documentRoute();
      ctx._documentSitemap = await client.hget(docKey, 'sitemap');
    } catch (e) {
      logging.error(e);
      ctx._documentSitemap = null;
    }

    return ctx._documentSitemap;
  }

  ctx.getManifest = async (location) => {
    if (standaloneLibro) {
      ctx.manifest = await ctx.documentManifest();
    }

    if (!ctx.manifest && await ctx.documentRoute()) {
      ctx.manifest = await ctx.documentManifest();
    } else if (!ctx.manifest) {
      try {
        const manifestLocation = location
          || ctx.request.headers.manifest
          || (await ctx.headResponse())?.headers?.get('Manifest');

        if (manifestLocation) {
          ctx.manifest = await getBackendManifest(ctx, manifestLocation);
        } else {
          ctx.manifest = defaultManifest(ctx.request.origin, false);
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
    if (standaloneLibro) {
      return undefined;
    }

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
      if (ctx.request.headers['website-iri']) {
        ctx.websiteIRI = ctx.request.headers['website-iri']
      } else {
        const manifest = await ctx.getManifest();
        ctx.websiteIRI = manifest?.ontola?.website_iri ?? manifest?.scope;
      }
    }

    return ctx.websiteIRI;
  };

  return ctx;
}

export default function ctxMiddleware(ctx, next) {
  enhanceCtx(ctx);

  return next();
}
