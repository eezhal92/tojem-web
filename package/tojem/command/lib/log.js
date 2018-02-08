/* eslint no-param-reassign: 0 */
const chalk = require('chalk');

const log = {
  write: (messages, style) => {
    messages = Array.isArray(messages) ? messages.join('\n') : messages;

    process.stdout.write(`${style(messages)}\n`);
  },
};

module.exports = {
  success(messages, opts) {
    opts = Object.assign({ silent: false }, opts);

    if (opts.silent) {
      return;
    }

    log.write(messages, chalk.green.bold);
  },
  info(messages, opts) {
    opts = Object.assign({ silent: false }, opts);

    if (opts.silent) {
      return;
    }

    log.write(messages, chalk.cyan.bold);
  },
  error(messages, opts) {
    opts = Object.assign({ silent: false }, opts);

    if (opts.silent) {
      return;
    }

    log.write(messages, chalk.red.bold);
  },
  warning(messages, opts) {
    opts = Object.assign({ silent: false }, opts);

    if (opts.silent) {
      return;
    }

    log.write(messages, chalk.yellow.bold);
  },
};
