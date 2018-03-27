module.exports = {
  testEnvironment: 'node',
  roots: ['<rootDir>/src', '<rootDir>/extendscript-library'],
  coveragePathIgnorePatterns: ['/node_modules/','/passthrough/','/shims/'],
  moduleDirectories: ['extendscript-library/passthrough', 'extendscript-library', 'node_modules'],
  globalSetup: './scripts/testing/setup.js',
  globalTeardown: './scripts/testing/teardown.js',
  collectCoverageFrom: ['src/**/*.{js,jsx}'],
};
