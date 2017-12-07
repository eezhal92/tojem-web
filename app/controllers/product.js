import database from '../models';

/**
 * @class
 */
class Product {
  constructor(db) {
    this.database = db;

    this.showAll = this.showAll.bind(this);
    this.showById = this.showById.bind(this);
    this.showForm = this.showForm.bind(this);
    this.store = this.store.bind(this);
    this.destroy = this.destroy.bind(this);
  }
  /**
   * Tampilkan semua daftar product.
   *
   * @param {Express.Request} request
   * @param {Express.Response} response
   */
  showAll(request, response) {
    this.database.products.findAll()
      .then((products) => {
        response.render('product-list', { products });
      })
      .catch((error) => {
        response.send(error);
      });
  }

  /**
   * Tampilkan product secara spesifik berdasarkan productId.
   *
   * @param {Express.Request} request
   * @param {Express.Response} response
   */
  showById(request, response) {
    this.database.products.findById(request.params.id)
      .then((product) => {
        if (!product) {
          response.render('not-found');

          return;
        }

        response.render('product-detail', { product });
      })
      .catch((error) => {
        response.send(error);
      });
  }

  // eslint-disable-next-line
  showForm (request, response) {
    response.render('product-create');
  }

  /**
   * Menyimpan record baru ke database.
   *
   * @param {Express.Request} request
   * @param {Express.Response} response
   */
  store(request, response) {
    const { name } = request.body;

    this.database.products.create({ name })
      .then((product) => {
        response.redirect(`/products/${product.id}`);
      })
      .catch((error) => {
        response.send(error);
      });
  }

  // eslint-disable-next-line
  destroy(request, response) {
    const error = new Error('Not implemented');

    return response.send(error);
  }
}

export default new Product(database);
