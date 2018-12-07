import { Client } from '@bugsnag/browser/dist/types/bugsnag-core';
import bugsnag from '@bugsnag/js';

import { BUGSNAG_KEY, RELEASE_STAGE } from '../config';

let client: Client;
if (BUGSNAG_KEY) {
  client = bugsnag({
    apiKey: BUGSNAG_KEY,
    appType: 'fe_client',
    appVersion: __VERSION__,
    collectUserIp: false,
    filters: [
        'password',
        'access_token',
        'accessToken',
        'Authorization',
    ],
    releaseStage: RELEASE_STAGE,
  });
} else {
  client = {
    notify(_: Error) { return void(0); },
  } as unknown as Client;
}
declare global {
  interface Window {
    logging: {
      errors: string[],
      logs: string[],
    };
  }
}
window.logging = {
  errors: [],
  logs: [],
};

// Prevent memory overflows
window.setInterval(() => {
  window.logging.errors = [];
  window.logging.logs = [];
}, 3600 * 1000);

export function error(...msg: any[]) {
  window.logging.errors.push(...msg);
  if (!__PRODUCTION__) {
    // tslint:disable-next-line no-console
    console.error(...msg);
  }
}

export function handle(exception: Error) {
  error(exception);
  client.notify(exception);
}

export function log(...msg: any[]) {
  if (!__PRODUCTION__) {
    // tslint:disable-next-line no-console
    console.log(...msg);
  }
  window.logging.logs.push(...msg);
}
