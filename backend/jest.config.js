module.exports = {
    testEnvironment: 'node',
    setupFilesAfterEnv: ['./tests/setup.js'], // setup for in-memory MongoDB
    testMatch: ['**/tests/**/*.test.js'], 
    verbose: true,
  };