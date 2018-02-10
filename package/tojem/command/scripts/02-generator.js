module.exports = (command) => {
  command('new:model', 'Generates a model and its migration.')
    .handler(function (args, opts) {
      return this.sequelize.exec('model:generate', args, opts);
    });

  command('new:migration', 'Generates a new migration file.')
    .handler(function (args, opts) {
      return this.sequelize.exec('migration:generate', args, opts);
    });

  command('new:seed', 'Generates a new seed file.')
    .handler(function (args, opts) {
      return this.sequelize.exec('seed:generate', args, opts);
    });
};
