const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');
const pathEnsure = require('path-ensure');

const env = require('../../env');
const config = require('../../config');

const BASE_PATH = config.get('dir.base');
const BIN_SEQUELIZE = path.resolve(BASE_PATH, 'node_modules', '.bin', 'sequelize');
const logDir = pathEnsure({ cwd: BASE_PATH });

const getSpawOptions = (opts) => {
  const outWrite = fs.openSync(logDir.sync('storage', 'logs', 'migration.log'), 'a');
  const errWrite = fs.openSync(logDir.sync('storage', 'logs', 'migration.log'), 'a');

  return {
    stdio: opts.silent ? ['ignore', outWrite, errWrite] : 'inherit',
    env: env(opts),
  };
};

const getMySqlUrl = (mode = 'development') => {
  const {
    username, password, host, database,
  } = config.get(`database.${mode}`);

  return `mysql://${username}:${password}@${host}/${database}`;
};

/**
 * Running sequelize CLI.
 *
 * @param  {string}   command [Sequelize command name]
 * @param  {string[]} args [The CLI params]
 * @param  {object}   opts [The CLI flags]
 * @return {Promise}
 */
module.exports.exec = (command, args = [], opts = {}) => {
  const { NODE_ENV } = env(opts);

  const runner = spawn(
    BIN_SEQUELIZE,
    [command, '--url', getMySqlUrl(NODE_ENV), ...args],
    getSpawOptions(opts),
  );

  return new Promise((resolve, reject) => {
    runner
      .on('close', resolve)
      .on('exit', resolve)
      .on('error', reject);
  });
};

/**
 * Running sequelize with silent mode.
 *
 * @param  {string}   command [Sequelize command name]
 * @param  {string[]} args [The CLI params]
 * @param  {object}   opts [The CLI flags]
 * @return {Promise}
 */
module.exports.execSilent = (command, args = [], opts = {}) =>
  module.exports.exec(command, args, Object.assign(opts, {
    silent: true,
  }));
