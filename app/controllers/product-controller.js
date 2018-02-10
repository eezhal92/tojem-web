import autoBind from 'auto-bind';

import auth from 'app/lib/auth';
import ps from 'app/services/product';
import { NotFoundError, UnprocessableEntityError } from 'app/lib/errors';

export class ProductController {
  /**
   * Create a new ProductController instance.
   *
   * @param  {Tojem.Service.ProductService} productService
   * @return {mix}
   */
  constructor(productService) {
    this.productService = productService;

    autoBind(this);
  }

  /**
   * Tampilkan semua daftar product.
   *
   * @param  {Express.Request}  request
   * @param  {Express.Response} response
   * @param  {function}         next
   * @return {Express.Response}
   */
  showAll(request, response, next) {
    auth.user.getAllProduct().then((products) => {
      response.render('backstore/product/list', { products });
    }).catch((error) => {
      next(error);
    });
  }

  /**
   * Tampilkan product secara spesifik berdasarkan productId.
   *
   * @param  {Express.Request}  request
   * @param  {Express.Response} response
   * @param  {function}         next
   * @return {Express.Response}
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

  /**
   * Show view form for create a new product.
   *
   * @param  {Express.Request}  request
   * @param  {Express.Response} response
   * @return {Express.Response}
   */
  showCreateForm(request, response) {
    // [TODO]: extrack into dedicated variable
    // request.app.local.error
    const inputError = new UnprocessableEntityError(
      request.flash('errors')[0],
      request.flash('oldInputs')[0],
    );

    const data = {
      error: inputError,
    };

    response.render('backstore/product/create', data);
  }

  /**
   * Persistence product into database.
   *
   * @param  {Express.Request}  request
   * @param  {Express.Response} response
   * @param  {function}         next
   * @return {Express.Response}
   */
  store(request, response, next) {
    const storeId = request.session.store.id;
    const { name, price, description = '' } = request.body;
    const data = {
      storeId, name, price, description,
    };

    this.productService.create(data)
      .then((product) => {
        response.redirect(`/backstore/products/${product.id}`);
      })
      .catch((error) => {
        next(error);
      });
  }

  /**
   * Show view form edit to change product associated by id.
   *
   * @param  {Express.Request}  request
   * @param  {Express.Response} response
   * @param  {function}         next
   * @return {Express.Response}
   */
  showEditForm(request, response, next) {
    const inputError = new UnprocessableEntityError(
      request.flash('errors')[0],
      request.flash('oldInputs')[0],
    );

    this.productService.findById(request.params.id)
      .then((product) => {
        const data = {
          product,
          error: inputError,
        };

        response.render('backstore/product/edit', data);
      })
      .catch((error) => {
        next(error);
      });
  }

  /**
   * Update and persistence the product associated by id.
   *
   * @param  {Express.Request}  request
   * @param  {Express.Response} response
   * @param  {function}         next
   * @return {Express.Response}
   */
  async update(request, response, next) {
    const productId = request.params.id;

    try {
      const product = await this.productService.findById(productId);
      const { name, price, description } = request.body;

      await product.update({ name, price, description });

      response.redirect(`/backstore/products/${productId}`);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Menyembunyikan produk dari listing.
   *
   * @param  {Express.Request}  request
   * @param  {Express.Response} response
   * @param  {function}         next
   * @return {Express.Response}
   */
  deactivate(request, response, next) {
    // ...
  }
}

export default new ProductController(ps);
