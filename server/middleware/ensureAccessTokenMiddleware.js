import { NOT_FOUND } from 'http-status-codes';

import { processTokenRequest } from '../utils/tokens';

const requireAccessToken = (ctx) => (
  ['POST', 'PUT', 'PATCH', 'DELETE'].includes(ctx.method)
);

export default async function ensureAccessTokenMiddleware(ctx, next) {
  if (!ctx.session.userToken && requireAccessToken(ctx)) {
    const websiteIRI = await ctx.getWebsiteIRI();

    if (!websiteIRI) {
      ctx.response.status = NOT_FOUND;

      return null;
    }

    await processTokenRequest(
      ctx,
      ctx.api.requestGuestToken(websiteIRI)
    );
  }

  return next();
}
