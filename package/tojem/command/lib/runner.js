const fs = require('fs');
const path = require('path');

const config = require('../../config');
const collections = require('./collections');

class CommandError extends Error {
  constructor(message) {
    super(message);
    this.code = 'COMMAND_NOT_FOUND';
  }
}

const runner = async (command, args = [], options = {}) => {
  if (!fs.existsSync(path.join(config.get('dir.base'), '.env'))) {
    throw new Error('`.env` file not found. Please run `node tojem init`');
  }

  const cli = collections.get(command);

  if (!cli) {
    throw new CommandError(`Command not found: ${command || ''}`);
  }

  const promise = await Promise.resolve(cli.exec(args, options));

  return promise;
};

runner.silent = (command, args = [], options = {}) => runner(command, args, {
  ...options,
  silent: true,
});

module.exports = runner;
