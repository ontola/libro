import API from '../API';
import { EXEC_HEADER_NAME } from '../utils/actions';

export default function apiMiddleware(ctx, next) {
  const userToken = ctx.session && ctx.session.arguToken && ctx.session.arguToken.accessToken;

  ctx.api = new API({
    req: ctx.request,
    userToken,
  });

  ctx.addAction = (action) => {
    ctx.response.set(EXEC_HEADER_NAME, action);
  };

  return next();
}
