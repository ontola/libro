import API from '../API';
import { EXEC_HEADER_NAME } from '../utils/actions';
import { getBackendManifest } from '../utils/manifest';

const BACKEND_TIMEOUT = 3000;

export default function apiMiddleware(ctx, next) {
  const userToken = ctx.session && ctx.session.arguToken && ctx.session.arguToken.accessToken;

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

      const auth = ctx.headResponseResult.headers.get('new-authorization');
      if (auth) {
        ctx.session.arguToken = { accessToken: auth };
        ctx.api.userToken = auth;
      }
    }

    return ctx.headResponseResult;
  };

  ctx.api = new API({
    deviceId: ctx.deviceId,
    req: ctx.request,
    userToken,
  });

  ctx.addAction = (action) => {
    ctx.response.set(EXEC_HEADER_NAME, action);
  };

  return next();
}
