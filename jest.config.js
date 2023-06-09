/* global module */
module.exports = {
  coverageThreshold: {
    global: {
      branches: 35,
      functions: 41,
      lines: 75,
      statements: 75,
    },
  },
  globals: {
    __CLIENT__: true,
    __DEVELOPMENT__: false,
    __PRODUCTION__: false,
    __TEST__: true,
    'ts-jest': {
      isolatedModules: true,
      tsconfig: 'app/tsconfig.json',
    },
  },
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/tests/fileMock.js',
    '\\.(scss|css|less)$': 'identity-obj-proxy',
  },
  preset: 'ts-jest',
  setupFiles: [
    './app/useFactory.ts',
  ],
  setupFilesAfterEnv: [
    '<rootDir>/tests/testhelper-node.ts',
    '@testing-library/jest-dom/extend-expect',
  ],
  testEnvironment: 'node',
  testEnvironmentOptions: {
    url: 'https://argu.dev/o/1'
  },
  testMatch: [
    '**/__tests__/**/*.ts?(x)',
    '**/?(*.)+(spec|test).ts?(x)'
  ],
  testPathIgnorePatterns: [
    'app/__tests__/test-utils.jsx',
    'app/__tests__/test-utils-hooks.ts',
    'app/__tests__/link-redux/fixtures.js',
    'app/__tests__/link-redux/utilities.js',
  ],
  transform: {
    '^.+\\.m?(j|t)sx?$': 'ts-jest',
  },
  transformIgnorePatterns: [
    'node_modules/(?!(intl-messageformat|react-intl|ol)/).+\\.js$',
  ],
};
