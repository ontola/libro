import bugsnag from '@bugsnag/js';
import bugsnagExpress from '@bugsnag/plugin-express';

import * as config from '../config';

const bugsnagClient = bugsnag({
  apiKey: config.bugsnagKey,
  appType: 'fe_back',
  appVersion: __VERSION__,
  autoCaptureSessions: false,
  releaseStage: config.RELEASE_STAGE,
});
bugsnagClient.use(bugsnagExpress);
const bugsnagMiddleware = bugsnagClient.getPlugin('express');

export {
  bugsnagClient,
  bugsnagMiddleware,
};

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
