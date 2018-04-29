module.exports = {
  moduleFileExtensions: [
    'js',
    'json',
    'vue',
  ],
  moduleNameMapper: {
    '^app/(.*)$': '<rootDir>/app/$1',
  },
  transform: {
    '^.+\\.js$': '<rootDir>/node_modules/babel-jest',
    '.*\\.(vue)$': '<rootDir>/node_modules/vue-jest',
  },
  setupFiles: [
    '<rootDir>/config/jest-setup.js',
  ],
};
