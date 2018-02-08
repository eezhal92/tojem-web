const path = require('path');

try {
  if (!process.env.NODE_ENV) {
    throw new Error('[App] NODE_ENV value must be set');
  }

  const NODE_PATH = process.env.NODE_PATH.split(path.delimiter);

  if (!NODE_PATH.includes(path.resolve(__dirname, '..'))) {
    throw new Error('[App]: The root app path should be exist in the NODE_PATH');
  }
} catch (err) {
  console.error(err); // eslint-disable-line
  process.exit(1);
}

// eslint-disable-next-line no-global-assign
require = require('@std/esm')(module);
module.exports = require('./server').default;
