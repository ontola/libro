import { INTERNAL_SERVER_ERROR } from 'http-status-codes';

import logging from './logging';

export default (fn) => (ctx, next) => Promise.resolve(fn(ctx, next)).catch((e) => {
  if (ctx.bugsnag) {
    ctx.bugsnag.notify(e);
  }
  logging.error(e);
  ctx.response.status = INTERNAL_SERVER_ERROR;
});
