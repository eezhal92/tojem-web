module.exports = (command) => {
  command('db:create', 'Create database.')
    .handler(function (args, opts) {
      this.log.info('> Running - create database.', opts);

      return this.sequelize.exec('db:create', [], opts);
    });

  command('db:drop', 'Drop database.')
    .handler(function (args, opts) {
      this.log.info('> Running - drop database.', opts);

      return this.sequelize.exec('db:drop', [], opts);
    });

  command('db:refresh', 'Refresh database and table.')
    .handler(async function (args, opts) {
      this.log.info('> Starting refresh database.', opts);

      await this.run('db:drop', [], opts);
      await this.run('db:create', [], opts);

      return this.run('db:migrate', [], opts);
    });

  command('db:migrate', 'Run pending migrations.')
    .handler(function (args, opts) {
      this.log.info('> Running - database migration.', opts);

      return this.sequelize.exec('db:migrate', [], opts);
    });

  command('db:migrate:undo', 'Reverts a migration.')
    .handler(function (args, opts) {
      this.log.info('> Running - migration undo.', opts);

      return this.sequelize.exec('db:migrate:undo', [], opts);
    });

  command('db:migrate:rollback', 'Rollback all database migrations.')
    .handler(function (args, opts) {
      this.log.info('> Running - migration rollback.', opts);

      return this.sequelize.exec('db:migrate:undo:all', [], opts);
    });

  command('db:migrate:refresh', 'Refresh database migration.')
    .handler(async function (args, opts) {
      this.log.info('> Refresh database.', opts);

      await this.run('db:migrate:rollback', [], opts);

      await this.run('db:migrate', [], opts);
    });

  command('db:seed', 'Run specified seeder.')
    .handler(function (args, opts) {
      this.log.info('> Running - database seeder.', opts);

      return this.sequelize.exec('db:seed', args, opts);
    });

  command('db:seed:undo', 'Deletes data from the database.')
    .handler(function (args, opts) {
      this.log.info('> Running - undo seeder.', opts);

      return this.sequelize.exec('db:seed:undo', args, opts);
    });

  command('db:seed:all', 'Run every seeder.')
    .handler(function (args, opts) {
      this.log.info('> Running - all seeder.', opts);

      return this.sequelize.exec('db:seed:all', args, opts);
    });

  command('db:seed:rollback', 'Deletes data from the database.')
    .handler(function (args, opts) {
      this.log.info('> Running - drop all seeder.', opts);

      return this.sequelize.exec('db:seed:undo:all', args, opts);
    });
};
