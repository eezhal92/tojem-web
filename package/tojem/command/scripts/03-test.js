const path = require('path');
const { spawn } = require('child_process');

module.exports = (command) => {
  command('test:all')
    .describe('Running all test.')
    .handler(function (args, opts) {
      this.log.info([
        '> Comming soon.',
        '  Run all test integration.',
      ]);
    });

  command('test:e2e')
    .describe('Running browser test (e2e).')
    .options({
      name: 'delay',
      alias: 'D',
      type: 'number',
      default: 900,
      describe: 'Delay time [ms] after server running.',
    })
    .handler(async function (args, opts) {
      opts = Object.assign({}, opts, { // eslint-disable-line no-param-reassign
        silent: !opts.verbose && true,
        test: true,
      });

      const { delay } = opts;
      delete opts.delay; // eslint-disable-line no-param-reassign

      const BASE_PATH = path.resolve(this.config.get('dir.base'));
      const BIN = path.join(BASE_PATH, 'node_modules', '.bin', 'nightwatch');
      const nightwatchConf = path.resolve(this.config.get('dir.config'), 'nightwatch.js');

      await this.run('db:drop', [], opts);
      await this.run('db:create', [], opts);
      await this.run('db:migrate', [], opts);

      const runBrowserTest = (options = {}) => new Promise((resolve) => {
        setTimeout(() => {
          resolve(spawn(BIN, args.concat(['--config', nightwatchConf]), {
            stdio: 'inherit',
            env: {
              ...this.env(opts),
              NODE_PATH: [
                BASE_PATH,
                path.resolve(this.config.get('dir.package')),
              ].join(path.delimiter),
            },
          }));
        }, options.delay || 0);
      });

      this.run('serve', [], opts).then((server) => {
        const exit = (code) => {
          process.kill(server.pid);
          process.exit(code || 0);
        };

        return runBrowserTest({ delay }).then((browser) => {
          this.log.info([
            '> Running - browser test e2e.',
            `  pid: ${browser.pid}`,
            `  bin: ${path.basename(browser.spawnfile)}`,
          ], opts);

          browser
            .on('close', exit)
            .on('exit', exit);
        });
      }).catch((error) => {
        throw error;
      });
    });
};
