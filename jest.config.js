const { defaults } = require('jest-config')
module.exports = {
  testMatch: ['<rootDir>/src/**/*.spec.ts', '<rootDir>/src/**/*.spec.tsx'],
  preset: 'ts-jest',
  testEnvironment: 'node',
  collectCoverage: false,
  collectCoverageFrom: ['<rootDir>/src/**/*.ts', '!<rootDir>/src/**/index.ts', '!<rootDir>/**/*.d.ts'],
  moduleFileExtensions: [...defaults.moduleFileExtensions, 'd.ts'],
}
