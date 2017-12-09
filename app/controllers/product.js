import { productService as ps } from '../services';
import { NotFoundError } from '../lib/errors';

/**
 * Product controller
 */
class Product {
  constructor(productService) {
    this.productService = productService;

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
    this.productService.findAllByStore({ id: 1 })
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
    this.productService.findById(request.params.id)
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
  store(request, response, next) {
    const storeId = request.session.store.id;
    const { name, price, description = '' } = request.body;

    this.productService.create({
      storeId,
      name,
      price,
      description,
    })
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

export default new Product(ps);
