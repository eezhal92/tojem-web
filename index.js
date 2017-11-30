const { resolve } = require('path');
const dotEnv = require('dotenv');

dotEnv.config();

try {
  if (!process.env.NODE_ENV) {
    throw new Error('[App] NODE_ENV value must be set');
  }

  if (resolve(process.env.NODE_PATH) !== resolve(__dirname)) {
    throw new Error('[App] NODE_PATH value should be equal to root app path');
  }
} catch (err) {
  console.error(err); // eslint-disable-line no-console
  process.exit(1);
}

require = require('@std/esm')(module); // eslint-disable-line no-global-assign, global-require

module.exports = require('./main').default; // eslint-disable-line global-require
