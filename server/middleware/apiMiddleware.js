import API from '../API';

export default function apiMiddleware(ctx, next) {
  ctx.api = new API(ctx);

  return next();
}
