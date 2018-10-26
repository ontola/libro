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
    __CLIENT__: 'true',
    __DEVELOPMENT__: 'false',
    __ORIGIN__: '',
    __PRODUCTION__: 'false',
    __TEST__: 'true',
    'process.env.ARGU_API_URL': '',
    'process.env.FRONTEND_HOSTNAME': '',
  },
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/__mocks__/fileMock.js',
    '\\.(scss|css|less)$': 'identity-obj-proxy',
  },
  preset: 'ts-jest',
  setupFiles: [
    'jest-plugin-context/setup',
    'jest-plugin-set/setup',
  ],
  setupTestFrameworkScriptFile: '<rootDir>/tests/testhelper.js',
  testURL: 'https://argu.dev/o/1',
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
  },
};
