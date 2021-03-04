/* global module */
module.exports = {
  coverageThreshold: {
    global: {
      branches: 53,
      functions: 60,
      lines: 70,
      statements: 70,
    },
  },
  globals: {
    __CLIENT__: true,
    __DEVELOPMENT__: false,
    __PRODUCTION__: false,
    __TEST__: true,
    'process.env.ARGU_API_URL': '',
  },
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/__mocks__/fileMock.js',
    '\\.(scss|css|less)$': 'identity-obj-proxy',
  },
  setupFiles: [
    './useFactory.js',
    'jest-plugin-context/setup',
    'jest-plugin-set/setup',
  ],
  setupFilesAfterEnv: [
    '<rootDir>/../tests/testhelper.js',
    '@testing-library/jest-dom/extend-expect',
  ],
  testEnvironment: 'jest-environment-jsdom-fifteen',
  testPathIgnorePatterns: [
    'app/__tests__/test-utils.jsx',
    'app/__tests__/link-redux/fixtures.js',
    'app/__tests__/link-redux/utilities.js',
  ],
  testURL: 'https://argu.dev/o/1',
  transformIgnorePatterns: [
    'node_modules/(?!(intl-messageformat|react-intl)/)',
  ],
};
