import { processTokenRequest } from '../utils/tokens';

const requireAccessToken = (ctx) => (
  ['POST', 'PUT', 'PATCH', 'DELETE'].includes(ctx.method)
);

export default async function ensureAccessTokenMiddleware(ctx, next) {
  if (!ctx.session.userToken && requireAccessToken(ctx)) {
    await processTokenRequest(
      ctx,
      ctx.api.requestGuestToken(await ctx.getWebsiteIRI())
    );
  }

  return next();
}
