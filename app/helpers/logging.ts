import { Client } from '@bugsnag/browser/dist/types/bugsnag-core';

const globalThis = typeof window !== 'undefined' ? window : (global as unknown as Window);

declare global {
  interface Window {
    bugsnagClient: Client | undefined;
  }
}

let client: Client;
if (typeof window !== 'undefined' && typeof window.bugsnagClient !== 'undefined') {
  client = window.bugsnagClient;
} else {
  client = {
    notify(_: Error) { return void(0); },
  } as unknown as Client;
}

declare global {
  interface Window {
    logging: {
      errors: any[],
      logs: any[],
    };
  }
}
globalThis.logging = {
  errors: [],
  logs: [],
};

// Prevent memory overflows
globalThis.setInterval(() => {
  globalThis.logging.errors = [];
  globalThis.logging.logs = [];
}, 3600 * 1000);

export function error(...msg: any[]) {
  globalThis.logging.errors.push(msg);
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
  globalThis.logging.logs.push(msg);
  if (!__PRODUCTION__) {
    // tslint:disable-next-line no-console
    console.log(...msg);
  }
}
