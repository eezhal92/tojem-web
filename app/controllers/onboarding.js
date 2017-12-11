import database from '../models';

/**
 * Onboarding controller
 */
class Onboarding {
  constructor(db) {
    this.database = db;

    this.createStoreForm = this.createStoreForm.bind(this);
    this.createStore = this.createStore.bind(this);
  }

  // eslint-disable-next-line
  createStoreForm(request, response) {
    const data = { user: request.user, csrfToken: request.csrfToken() };

    response.render('onboarding/create-store', data);
  }

  /**
   * Menyimpan record store baru ke database.
   *
   * @param {Express.Request} request
   * @param {Express.Response} response
   * @param {function} next
   */
  createStore(request, response, next) {
    const ownerId = request.user.id;
    const {
      name,
      location,
      address,
    } = request.body;

    this.database.store.create({
      ownerId,
      name,
      location,
      address,
    })
      .then((store) => {
        // @todo maybe it should be extracted into a dedicated function. it's duplicated
        // @see app/middlewares/store.js
        request.session.store = store.dataValues;

        response.redirect('/backstore/products');
      })
      .catch((error) => {
        next(error);
      });
  }
}

export default new Onboarding(database);
