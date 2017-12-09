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
  let {
    DB_NAME,
    DB_USER,
    DB_PASSWORD,
    DB_HOST,
  } = env;

  const {
    NODE_ENV,
    TEST_DB_NAME,
    TEST_DB_USER,
    TEST_DB_PASSWORD,
    TEST_DB_HOST,
  } = env;

  if (NODE_ENV === 'test') {
    DB_NAME = TEST_DB_NAME;
    DB_USER = TEST_DB_USER;
    DB_PASSWORD = TEST_DB_PASSWORD;
    DB_HOST = TEST_DB_HOST;
  }

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
   * Rollback a migration.
   */
  'db:migrate:undo': () => {
    loadEnv();

    process.stdout.write('Rollback database migration.\n');

    spawn(BIN_SEQUELIZE, ['db:migrate:undo', '--url', getMysqlUrl(process.env)], { stdio: 'inherit' });
  },

  /**
   * Rollback all migration
   */
  'db:migrate:rollback': () => {
    loadEnv();

    process.stdout.write('Rollback database migration.\n');

    spawn(BIN_SEQUELIZE, ['db:migrate:undo:all', '--url', getMysqlUrl(process.env)], { stdio: 'inherit' });
  },
};
