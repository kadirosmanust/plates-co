module.exports = {
  testEnvironment: 'jsdom',
  verbose: true,
  testTimeout: 15_000,
  collectCoverageFrom: ['src/**/*.js'],
  coverageDirectory: './coverage/',
  coverageThreshold: {
    global: {
      branches: 20,
      functions: 20,
      lines: 20,
      statements: 20,
    },
  },
  testResultsProcessor: 'jest-sonar-reporter',
  moduleDirectories: ['node_modules', 'src', 'tests'],
  moduleNameMapper: {
    '@src/(.*)$': '<rootDir>/src/$1',
    '@tests/(.*)$': '<rootDir>/tests/$1',
  },
  testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/build/'],
  testMatch: ['**/*.(spec|test).js'],
};
