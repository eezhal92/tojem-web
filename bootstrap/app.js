const { resolve } = require('path');
const dotEnv = require('dotenv');

dotEnv.config();

try {
  if (!process.env.NODE_ENV) {
    throw new Error('[App] NODE_ENV value must be set');
  }

  if (resolve(process.env.NODE_PATH) !== resolve(__dirname, '..')) {
    throw new Error('[App] NODE_PATH value should be equal to root app path');
  }
} catch (err) {
  process.stderr.write(err);
  process.exit(1);
}

// eslint-disable-next-line no-global-assign
require = require('@std/esm')(module);
module.exports = require('./server').default;
