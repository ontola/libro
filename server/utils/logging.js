import bugsnag from '@bugsnag/js';
import bugsnagExpress from '@bugsnag/plugin-express';

import * as config from '../config';

export function getErrorMiddleware() {
  if (process.env.NODE_ENV !== 'development') {
    const bugsnagClient = bugsnag({
      apiKey: config.bugsnagKey,
      appType: 'fe_back',
      appVersion: __VERSION__,
      autoCaptureSessions: false,
      releaseStage: config.RELEASE_STAGE,
    });
    bugsnagClient.use(bugsnagExpress);
    return bugsnagClient.getPlugin('express');
  }

  return {
    errorHandler: (req, res, next) => next(),
    requestHandler: (req, res, next) => {
      req.bugsnag = {
        notify() {},
      };
      next();
    },
  };
}

export default {
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
