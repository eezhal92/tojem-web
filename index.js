if (!process.env.NODE_ENV) {
  console.error('[App] NODE_ENV value must be set')

  return;
}

const { resolve } = require('path')

if (resolve(process.env.NODE_PATH) !== resolve(__dirname)) {
  console.error('[App] NODE_PATH value should be equal to root app path')

  return;
}

require('dotenv').config()

require = require('@std/esm')(module);

module.exports = require('./main').default;
