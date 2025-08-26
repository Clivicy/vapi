module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/__tests__/**/*.test.ts'],
  setupFiles: ['<rootDir>/jest.setup.js'],
  moduleFileExtensions: ['ts', 'js', 'json', 'node'],
  moduleDirectories: ['node_modules', 'src'],
  moduleNameMapper: {
    '^@middleware/(.*)$': '<rootDir>/src/middleware/$1',
    '^@agents/(.*)$': '<rootDir>/src/agents/$1',
    '^@voice/(.*)$': '<rootDir>/src/voice/$1',
    '^@apikeys/(.*)$': '<rootDir>/src/apikeys/$1',
    '^@logs/(.*)$': '<rootDir>/src/logs/$1',
    '^@metrics/(.*)$': '<rootDir>/src/metrics/$1',
    '^@testsuites/(.*)$': '<rootDir>/src/testsuites/$1',
    '^@phonenumbers/(.*)$': '<rootDir>/src/phonenumbers/$1',
    '^@tools/(.*)$': '<rootDir>/src/tools/$1',
    '^@integrations/(.*)$': '<rootDir>/src/integrations/$1',
    '^@auth/(.*)$': '<rootDir>/src/auth/$1',
    '^@config/(.*)$': '<rootDir>/src/config/$1',
    '^app$': '<rootDir>/src/app.ts',
  },
  globals: {
    'ts-jest': {
      isolatedModules: true,
    },
  },
};
