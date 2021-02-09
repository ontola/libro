import * as constants from '../../config';

import Check from './check';

export default class EnvironmentCheck extends Check {
  constructor() {
    super('Libro environment variables');
  }

  // eslint-disable-next-line class-methods-use-this
  async runTest() {
    const failed = [];

    const checkPresence = (key, value) => {
      if (typeof value !== 'string' || value.trim().length === 0) {
        failed.push(key);
      }
    };

    if (process.env.NODE_ENV !== 'development') {
      [
        'assetsHost',
        'cacheChannel',
        'bugsnagKey',
        'mapboxKey',
        'mapboxUsername',
      ].forEach((key) => checkPresence(key, constants[key]));
    }

    [
      'backendApiUrl',
      'clientId',
      'clientSecret',
      'jwtEncryptionToken',
      'oAuthToken',
      'redisUrl',
      'sessionSecret',
      'websocketPath',
    ].forEach((key) => checkPresence(key, constants[key]));

    if (failed.length > 0) {
      throw new Error(`Invalid: ${failed.join(', ')}`);
    }
  }
}
