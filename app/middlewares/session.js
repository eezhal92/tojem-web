import { Store } from 'express-session';
import sessionSequelize from 'connect-session-sequelize';
import db from 'app/models';

/**
 * Handle session provided by NODE_ENV.
 *
 * @param  {string}  env
 * @param  {object?} sessionProvider
 * @return {object}
 *
 * @throws {Error}
 */
function session(env, sessionProvider) {
  if (!env) {
    throw new Error('session: `env` must be set');
  }

  let sessionOptions = {
    secret: 'keyboard cat',
    saveUninitialized: true,
    resave: true,
  };

  if (env !== 'test') {
    const store = Object.assign({
      Provider: sessionSequelize(Store),
    }, sessionProvider);

    sessionOptions = Object.assign(sessionOptions, {
      resave: false,
      proxy: false,
      store: new store.Provider({
        db: db.sequelize,
        table: db.session.name,
      }),
    });
  }

  return sessionOptions;
}

export default session;
