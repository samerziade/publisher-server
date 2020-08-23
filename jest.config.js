const { defaults } = require('jest-config')
module.exports = {
  testMatch: ['<rootDir>/src/**/*.spec.ts', '!<rootDir>/src/**/index.spec.ts'],
  preset: 'ts-jest',
  testEnvironment: 'node',
  collectCoverage: false,
  collectCoverageFrom: ['<rootDir>/src/**/*.ts', '!<rootDir>/src/**/index.ts'],
  moduleFileExtensions: [...defaults.moduleFileExtensions, 'd.ts'],
}
