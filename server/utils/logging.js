import { logLevel } from '../config';

export default {
  debug(msg, ...params) {
    if (logLevel === 'debug') {
      // eslint-disable-next-line no-console
      console.debug(msg, ...params);
    }
  },
};
