const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');
const { setupEnv } = require('./utils/env');

const { NODE_PATH } = process.env;
const BIN_SEQUELIZE = path.resolve(NODE_PATH, 'node_modules', '.bin', 'sequelize');

const outWrite = fs.openSync(path.join(NODE_PATH, 'storage', 'logs', 'migration.log'), 'a+');
const errWrite = fs.openSync(path.join(NODE_PATH, 'storage', 'logs', 'migration.log'), 'a+');
const getSpawOptions = opts => ({ stdio: opts.silent ? ['ignore', outWrite, errWrite] : 'inherit' });

function getMysqlUrl() {
  const config = require('../config/database')[process.env.NODE_ENV]; // eslint-disable-line global-require
  const {
    username, password, host, database,
  } = config;

  return `mysql://${username}:${password}@${host}/${database}`;
}

module.exports = {
  /**
   * Up migration.
   *
   * @param  {object}  opts The CLI flags
   * @return {Promise}
   */
  'db:migrate': function dbMigrate(opts = {}) {
    process.stdout.write('> Running - migration up.\n');

    setupEnv(opts);

    return new Promise((resolve) => {
      spawn(BIN_SEQUELIZE, ['db:migrate', '--url', getMysqlUrl()], getSpawOptions(opts))
        .on('close', () => {
          resolve();
        });
    });
  },

  /**
   * Rollback a migration.
   *
   * @param  {object}  opts The CLI flags
   * @return {Promise}
   */
  'db:migrate:undo': function dbMigrateUndo(opts = {}) {
    process.stdout.write('> Running - migration undo.\n');

    setupEnv(opts);

    return new Promise((resolve) => {
      spawn(BIN_SEQUELIZE, ['db:migrate:undo', '--url', getMysqlUrl()], getSpawOptions(opts))
        .on('close', () => {
          resolve();
        });
    });
  },

  /**
   * Rollback all migration
   *
   * @param  {object}  opts The CLI flags
   * @return {Promise}
   */
  'db:migrate:rollback': function dbMigrateRollback(opts = {}) {
    process.stdout.write('> Running - migration rollback.\n');

    setupEnv(opts);

    return new Promise((resolve) => {
      spawn(BIN_SEQUELIZE, ['db:migrate:undo:all', '--url', getMysqlUrl()], getSpawOptions(opts))
        .on('close', () => {
          resolve();
        });
    });
  },

  /**
   * Refresh migration.
   *
   *  - Rollback all migration.
   *  - Fire up database migration.
   *
   * @param  {object}   opts The CLI flags
   * @return {Promise}
   */
  'db:migrate:refresh': function dbMigrateRefresh(opts) {
    process.stdout.write('> Refresh database.\n');

    return Promise.resolve()
      .then(() => this['db:migrate:rollback'](opts))
      .then(() => this['db:migrate'](opts));
  },
};
