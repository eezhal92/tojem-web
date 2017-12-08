import database from '../models';
import { NotFoundError } from '../lib/errors';

/**
 * Product controller
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
   * @param {function} next
   */
  showAll(request, response, next) {
    this.database.Product.findAll()
      .then((products) => {
        response.render('backstore/product/list', { products });
      })
      .catch((error) => {
        next(error);
      });
  }

  /**
   * Tampilkan product secara spesifik berdasarkan productId.
   *
   * @param {Express.Request} request
   * @param {Express.Response} response
   * @param {function} next
   */
  showById(request, response, next) {
    this.database.Product.findById(request.params.id)
      .then((product) => {
        if (!product) {
          next(new NotFoundError('Produk kagak ditemukan'));

          return;
        }

        response.render('backstore/product/detail', { product });
      })
      .catch((error) => {
        next(error);
      });
  }

  // eslint-disable-next-line
  showForm (request, response) {
    const data = { csrfToken: request.csrfToken() };

    response.render('backstore/product/create', data);
  }

  /**
   * Menyimpan record baru ke database.
   *
   * @param {Express.Request} request
   * @param {Express.Response} response
   * @param {function} next
   */
  async store(request, response, next) {
    // @todo hard-code, change it later
    const storeId = 1;
    const { name, description = '' } = request.body;

    this.database.Product.create({ storeId, name, description })
      .then((product) => {
        response.redirect(`/backstore/products/${product.id}`);
      })
      .catch((error) => {
        next(error);
      });
  }

  // eslint-disable-next-line
  destroy(request, response, next) {
    const error = new Error('Not implemented');

    next(error);
  }
}

export default new Product(database);
