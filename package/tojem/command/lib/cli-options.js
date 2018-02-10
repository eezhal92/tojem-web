module.exports = {
  silent: {
    alias: 's',
    type: 'boolean',
    default: false,
    describe: 'Don\'t display log in stdout.',
  },
  verbose: {
    alias: 'V',
    type: 'boolean',
    default: false,
    describe: 'Force output to stdout.',
  },
  test: {
    alias: 't',
    type: 'boolean',
    default: false,
    describe: 'Set the environment to test.',
  },
  help: {
    type: 'boolean',
    describe: 'Display this messages and exit.',
  },
};
