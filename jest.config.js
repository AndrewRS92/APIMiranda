module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    transform: {
      '^.+\\.ts?$': 'ts-jest',
    },
    testMatch: ['**/src/tests/**/*.test.ts'],
    moduleFileExtensions: ['ts', 'js'],
  };
  