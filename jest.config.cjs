module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node', // or 'jsdom' if you're testing browser-like environments
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  testPathIgnorePatterns: ['/node_modules/'],
};
