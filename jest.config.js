module.exports = {
  coverageThreshold: {
    global: {
      branches: 53,
      functions: 60,
      lines: 70,
      statements: 70,
    },
  },
  projects: [
    '<rootDir>/app/jest.config.js',
    '<rootDir>/server/jest.config.js',
  ],
  setupFilesAfterEnv: ['<rootDir>/tests/testhelper.js'],
};
