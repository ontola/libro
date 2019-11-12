import bugsnag from '@bugsnag/js';
import bugsnagKoa from '@bugsnag/plugin-koa';

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
      }
    },
  };
}

export default logging;
