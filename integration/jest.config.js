/* global module, process */

const headless = process.env['HEADLESS'] !== 'false';

module.exports = {
  preset: 'jest-playwright-preset',
  setupFiles: [
    '../app/useFactory.ts',
  ],
  setupFilesAfterEnv: [
    '@testing-library/jest-dom/extend-expect',
  ],
  testEnvironmentOptions: {
    'jest-playwright': {
      contextOptions: {
        ignoreHTTPSErrors: true,
      },
      launchOptions: {
        args: [
          '--host-resolver-rules="MAP 127.0.0.1 argu.localdev, MAP 127.0.0.1 demogemeente.localdev, MAP 127.0.0.1 argu.localtest, MAP 127.0.0.1 demogemeente.localtest"',
        ],
        headless,
        slowMo: headless ? 0 : 100,
      },
    },
  },
  testTimeout: 30000,
  transform: {
    '.': 'ts-jest',
  },
};
