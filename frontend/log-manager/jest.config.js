export const testEnvironment = 'jsdom';
export const transform = {
  '^.+\\.(ts|tsx)$': 'babel-jest',
};
export const moduleNameMapper = {
  '^@/(.*)$': '<rootDir>/src/$1',
  '\\.(css|scss|sass)$': 'identity-obj-proxy',
};
export const setupFilesAfterEnv = ['<rootDir>/jest.setup.ts'];
export const testPathIgnorePatterns = ['/node_modules/', '/.next/'];