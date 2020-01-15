import { Client } from '@bugsnag/browser/dist/types/bugsnag-core';
import bugsnag from '@bugsnag/js';

const globalThis = typeof window !== 'undefined' ? window : (global as unknown as Window);

declare global {
  interface Window {
    bugsnagClient: Client | undefined;
  }
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

function getClient() {
  const mockReporter = {
    notify(e: Error) {
      globalThis.logging.errors.push(e);
      return void(0);
    },
  } as unknown as Client;
  try {
    const raw = window.document.querySelector<HTMLMetaElement>('meta[name=bugsnagConfig]')?.content;
    if (raw) {
      const config = JSON.parse(decodeURIComponent(raw));
      return bugsnag({
        ...config,
        beforeSend(report) {
          globalThis.logging.errors.push(report);
        },
      });
    } else {
      return mockReporter;
    }
  } catch (e) {
    error(e);
    return mockReporter;
  }
}
const client = getClient();

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
