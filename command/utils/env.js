const fs = require('fs');
const path = require('path');

module.exports.setupEnv = (opts) => {
  process.env.PORT = opts.port || '3000';

  // eslint-disable-next-line no-nested-ternary
  process.env.NODE_ENV = opts.prod
    ? 'production'
    : ((opts.test) ? 'test' : 'development');

  const { NODE_ENV, NODE_PATH } = process.env;

  if (NODE_ENV === 'production') {
    return;
  }

  // In production mode, we dont need `.env` file.
  if (!fs.existsSync(path.resolve(NODE_PATH, '.env'))) {
    throw new Error('`.env` file not found. Please run `node tojem init`');
  }

  // eslint-disable-next-line
  require('dotenv').config();
};
