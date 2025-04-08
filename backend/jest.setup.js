// Silence console errors during tests (optional)
beforeAll(() => {
    process.env.JWT_SECRET = 'testsecret';
    process.env.JWT_EXPIRES_IN = '7d';
    process.env.MONGODB_URI = 'mongodb://localhost:27017/test-logs';
  });
  
  // Clean up after tests (if needed)
  afterAll(async () => {
    // Example: close db connection or stop mock servers
  });