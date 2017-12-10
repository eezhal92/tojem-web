const fs = require('fs');
const path = require('path');
const meow = require('meow');

process.env.NODE_PATH = path.resolve(__dirname, '..');

const { toString } = Object.prototype;
let command = Object.create(null);

const commands = fs.readdirSync(__dirname)
  .filter(fp => (fp !== path.basename(__filename)) && path.extname(fp) === '.js');

if (commands.length > 0) {
  commands.forEach((id) => {
    // eslint-disable-next-line
    const moduleId = require(`./${id}`);

    if (toString.call(moduleId) === '[object Object]') {
      command = { ...command, ...moduleId };
    }
  });
}

module.exports = (() => {
  const cli = meow(`
  $ node tojem <commands> [...options]

  Commands
    init                         Initialize application.
    serve                        Fire http server application.
      -p, --prod                 Set for production mode.
          --port                 Set server port. Default[3000]
    db:migrate                   Fire database migration up.
    db:migrate:undo              Rollback database migration.
    db:migrate:rollback          Rollback database migration.
    db:migrate:refresh           Refresh database migration.
    test:e2e                     Running browser test (e2e).

  Options
    -t, --test                   Set the environment to test.
    -s, --silent                 Don't display log in stdout.
        --help                   Display this messages and exit.
`, {
      flags: {
        prod: {
          type: 'boolean',
          alias: 'p',
          default: false,
        },
        port: {
          type: 'string',
          default: '3000',
        },
        silent: {
          alias: 's',
          default: false,
        },
        test: {
          alias: 't',
          default: false,
        },
      },
    });

  return {
    fire: () => {
      if (cli.input[0] in command) {
        command[cli.input[0]](cli.flags);

        return;
      }

      process.stdout.write(cli.help);
    },
  };
})();
