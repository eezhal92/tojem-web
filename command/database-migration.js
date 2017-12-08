const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

const { NODE_PATH } = process.env;
const BIN_SEQUELIZE = path.resolve(NODE_PATH, 'node_modules', '.bin', 'sequelize');

function loadEnv() {
  if (!fs.existsSync(path.resolve(NODE_PATH, '.env'))) {
    throw new Error('`.env` file not found. Please run `node tojem init`');
  }

  // eslint-disable-next-line
  require('dotenv').config();
}

function getMysqlUrl(env) {
  const {
    DB_NAME, DB_USER, DB_PASSWORD, DB_HOST,
  } = env;

  return `mysql://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`;
}

module.exports = {
  /**
   * Up migration.
   */
  'db:migrate': () => {
    loadEnv();

    process.stdout.write('Running database migration up.\n');

    spawn(BIN_SEQUELIZE, ['db:migrate', '--url', getMysqlUrl(process.env)], { stdio: 'inherit' });
  },

  /**
   * Rollback migration.
   */
  'db:migrate:undo': () => {
    loadEnv();

    process.stdout.write('Rollback database migration.\n');

    spawn(BIN_SEQUELIZE, ['db:migrate:undo', '--url', getMysqlUrl(process.env)], { stdio: 'inherit' });
  },
};
