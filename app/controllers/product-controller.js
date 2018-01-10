/* eslint class-methods-use-this: [2, { exceptMethods: [showCreateForm, deactivate] }] */

import autoBind from 'auto-bind';
import ps from 'app/services/product';
import viewData from 'app/lib/view-data';
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
    this.productService.findAllByStore({ id: 1 })
      .then((products) => {
        const data = viewData.wrapForRequest(request, { products });

        response.render('backstore/product/list', data);
      })
      .catch((error) => {
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

        const data = viewData.wrapForRequest(request, { product });

        response.render('backstore/product/detail', data);
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
    const inputError = new UnprocessableEntityError(
      request.flash('errors')[0],
      request.flash('oldInputs')[0],
    );

    const data = viewData.wrapForRequest(request, {
      csrfToken: request.csrfToken(),
      error: inputError,
    });

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
        const data = viewData.wrapForRequest(request, {
          product,
          error: inputError,
          csrfToken: request.csrfToken(),
        });

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
