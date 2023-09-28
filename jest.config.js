const esModules = ['./public/script.js'].join('|');

module.exports = {
    testEnvironment: 'jest-environment-jsdom', // Set the test environment to jest-environment-jsdom
    setupFiles: ['./dom-mock'],
    transform: {
        '^.+\\.(m?js|ts)$': 'babel-jest', // transpile mjs, mts, js, ts files
    },
    transformIgnorePatterns: [`/node_modules/(?!${esModules})`],
  };