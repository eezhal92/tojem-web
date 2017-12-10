export function storeSession(db) {
  return (request, response, next) => {
    db.store.findAll({ where: { ownerId: request.user.id } })
      .then((stores) => {
        if (stores.length) {
          const userStore = stores[0];

          request.session.store = userStore.dataValues;
        }

        next();
      })
      .catch((error) => {
        next(error);
      });
  };
}

/**
 * Fungsi factory untuk mengecek apakah seller telah membuat store
 * @param {models.db} db
 * @param {bool} options.condition
 * @param {string} options.redirectPath
 * @return {function}
 */
export default function hasStore(db, { condition = false, redirectPath = '/' } = {}) {
  /**
   * @param {Express.Request} request
   * @param {Express.Response} response
   * @param {function} next
   */
  return (request, response, next) =>
    db.store.findAll({ where: { ownerId: request.user.id } })
      .then((stores) => {
        const doesHaveStore = !!stores.length;
        if (doesHaveStore === condition) {
          response.redirect(redirectPath);

          return;
        }

        next();
      })
      .catch((error) => {
        next(error);
      });
}
