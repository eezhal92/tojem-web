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

    this.database.Store.create({
      ownerId,
      name,
      location,
      address,
    })
      .then(() => {
        response.redirect('/backstore/products');
      })
      .catch((error) => {
        next(error);
      });
  }
}

export default new Onboarding(database);
