const fs = require('fs');
const path = require('path');
const meow = require('meow');
const chalk = require('chalk');
const kebabCase = require('lodash/kebabCase');

const command = require('./index');
const cliOptions = require('./lib/cli-options');
const collections = require('./lib/collections');

const space = size => ' '.repeat(size || 0);
const gap = collections.keys().sort((a, b) => b.length - a.length)[0].length + 15;
const helpText = [];

const formatOptions = (opts = {}, addgap = 0) => {
  const arr = [];
  const flag = (() => {
    const aliasify = input => input.replace(/^-+/, '');

    return {
      alias: input => (input ? chalk`{magenta -${aliasify(input)},} ` : space(4)),
      name: input => chalk.magenta(`--${kebabCase(input)}`).padEnd(gap - (4 + addgap)),
    };
  })();

  Object.keys(opts).forEach((key) => {
    const {
      alias,
      describe,
      default: value,
      type,
    } = opts[key];

    arr.push([
      flag.alias(alias),
      flag.name(key),
      describe,
      (value !== null && value !== undefined) ? chalk` {red default[${type || typeof value}: ${value}]}` : '',
    ]);
  });

  return arr.map(str => space(4 + addgap) + str.join('')).join('\n');
};

let flags = cliOptions;

// eslint-disable-next-line no-restricted-syntax
for (const entry of collections.values()) {
  let { options } = entry;
  flags = { ...options, ...flags };

  options = options ? formatOptions(options, 2) : '';

  helpText.push([
    space(4) + chalk.green(entry.command).padEnd(gap),
    options ? `${entry.describe}\n` : entry.describe,
    options,
  ].join(''));
}

delete flags.help;

const cli = meow(chalk`
  {bold $ tojem {green <commands>} {magenta [...options]}}

  {bold Commands}
${helpText.join('\n')}

  {bold Options}
${formatOptions(cliOptions)}
`, { flags });

exports.fire = () => {
  const input = cli.input[0];
  const args = [...cli.input];

  args.shift();

  command.run(input, args, cli.flags).catch((error) => {
    if (error.code === 'COMMAND_NOT_FOUND') {
      cli.showHelp();
    } else {
      console.error(error); // eslint-disable-line no-console
    }

    process.exit(1);
  });
};
