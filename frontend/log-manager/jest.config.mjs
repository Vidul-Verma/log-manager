// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { pathsToModuleNameMapper } from 'ts-jest/utils';
import { readFileSync } from 'fs';
import { parse } from 'jsonc-parser';
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Read tsconfig paths if needed
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const tsconfig = parse(
  readFileSync(path.resolve(__dirname, 'tsconfig.json'), 'utf-8')
);

export default jestConfig = {
  preset: 'ts-jest/presets/default-esm', // 👈 ESM-compatible preset
  testEnvironment: 'jsdom',
  extensionsToTreatAsEsm: ['.ts', '.tsx'],
  transform: {
    '^.+\\.(ts|tsx)$': ['ts-jest', { useESM: true }]
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '\\.(css|scss|sass)$': 'identity-obj-proxy'
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  testPathIgnorePatterns: ['/node_modules/', '/.next/'],
};