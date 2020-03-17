import API from '../API';

export default function apiMiddleware(ctx, next) {
  ctx.api = new API({
    deviceId: ctx.deviceId,
    req: ctx.request,
  });

  return next();
}
