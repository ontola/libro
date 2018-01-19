module.exports = {
  coverageThreshold: {
    global: {
      branches: 36,
      functions: 50,
      lines: 57,
      statements: 58
    }
  },
  globals: {
    __CLIENT__: 'true',
    __DEVELOPMENT__: 'false',
    __ORIGIN__: '',
    __PRODUCTION__: 'false',
    'process.env.ARGU_API_URL': '',
    'process.env.ELASTICSEARCH_URL': '',
    'process.env.FRONTEND_HOSTNAME': '',
  },
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/__mocks__/fileMock.js',
    '\\.(scss|css|less)$': 'identity-obj-proxy'
  },
  setupFiles: [
    'jest-plugin-context/setup',
    'jest-plugin-set/setup',
  ],
  setupTestFrameworkScriptFile: '<rootDir>/tests/testhelper.js',
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
  },
};
