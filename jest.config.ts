import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.tsx?$': 'ts-jest', 
  },
  moduleNameMapper: {
  },
  transformIgnorePatterns: [
    '/node_modules/', 
  ],
};

export default config;