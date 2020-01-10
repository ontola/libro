import bugsnag from '@bugsnag/js';
import bugsnagKoa from '@bugsnag/plugin-koa';
import HttpStatus from 'http-status-codes';

import * as config from '../config';

const logging = {
  debug(msg, ...params) {
    if (config.logLevel === 'debug') {
      // eslint-disable-next-line no-console
      console.debug(msg, ...params);
    }
  },

  error(e, ...params) {
    // eslint-disable-next-line no-console
    console.error(e, ...params);
  },
};

export function getErrorMiddleware() {
  if (process.env.NODE_ENV !== 'development') {
    const bugsnagClient = bugsnag({
      apiKey: config.bugsnagKey,
      appType: 'fe_back',
      appVersion: __VERSION__,
      autoCaptureSessions: false,
      hostname: config.serverName,
      releaseStage: config.RELEASE_STAGE,
    });
    bugsnagClient.use(bugsnagKoa);

    return bugsnagClient.getPlugin('koa');
  }

  return {
    errorHandler: err => logging.error(err),
    requestHandler: async (ctx, next) => {
      ctx.bugsnag = {
        notify() {},
      };
      try {
        await next();
      } catch (err) {
        logging.error(err);
        if (!ctx.response.headerSent) {
          ctx.response.status = err.status || HttpStatus.INTERNAL_SERVER_ERROR;
        }

        try {
          // this function will throw if you give it a non-error, but we still want
          // to output that, so if it throws, pass it back what it threw (a TypeError)
          ctx.app.onerror(err);
        } catch (e) {
          ctx.app.onerror(e);
        }
      }
    },
  };
}

export default logging;
