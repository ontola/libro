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
        'ASSETS_HOST',
        'cacheChannel',
        'bugsnagKey',
        'mapboxKey',
        'mapboxUsername',
      ].forEach((key) => checkPresence(key, constants[key]));
    }

    [
      'ARGU_API_URL',
      'appHostname',
      'bundleName',
      'clientId',
      'clientSecret',
      'frontendHostname',
      'jwtEncryptionToken',
      'oAuthToken',
      'redisAddress',
      'serviceGuestToken',
      'sessionSecret',
      'websocketPath',
    ].forEach((key) => checkPresence(key, constants[key]));

    if (failed.length > 0) {
      throw new Error(`Invalid: ${failed.join(', ')}`);
    }
  }
}
