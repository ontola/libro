import type { Client } from '@bugsnag/js';

const globalThis = typeof window !== 'undefined' ? window : (global as unknown as Window);
// eslint-disable-next-line @typescript-eslint/no-magic-numbers
const LOGGING_INTERVAL = 3600 * 1000;

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

async function getClient(): Promise<Client> {
  if (__TEST__) {
    return {
      notify(e: Error) {
        throw e;
      },
    } as unknown as Client;
  }

  const mockReporter = {
    notify(e: Error) {
      globalThis.logging.errors.push(e);

      return void (0);
    },
  } as unknown as Client;

  try {
    const raw = typeof window !== 'undefined' && window
      .document
      .querySelector<HTMLMetaElement>('meta[name=bugsnagConfig]')
      ?.content;

    if (raw) {
      const config = JSON.parse(decodeURIComponent(raw));

      // eslint-disable-next-line no-inline-comments
      return (await import(/* webpackChunkName: "bugsnag" */ '@bugsnag/js')).default.createClient({
        ...config,
        beforeSend(report: any) {
          globalThis.logging.errors.push(report);
        },
      });
    }

    return mockReporter;
  } catch (e) {
    error(e);

    return mockReporter;
  }
}

if (!__TEST__) {
  // Prevent memory overflows
  globalThis.setInterval(() => {
    globalThis.logging.errors = [];
    globalThis.logging.logs = [];
  }, LOGGING_INTERVAL);
}

export function error(...msg: any[]): void {
  globalThis.logging.errors.push(msg);

  if (!__PRODUCTION__) {
    // eslint-disable-next-line no-console
    console.error(...msg);
  }
}

export function handle(exception: unknown): void {
  error(exception);
  getClient().then((client) => client.notify(exception as Error));
}

export function log(...msg: any[]): void {
  globalThis.logging.logs.push(msg);

  if (!__PRODUCTION__ && !__TEST__) {
    // eslint-disable-next-line no-console
    console.log(...msg);
  }
}
