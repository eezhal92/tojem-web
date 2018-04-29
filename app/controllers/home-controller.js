import autoBind from 'auto-bind';
import sequelize from 'sequelize';

import dbModels from 'app/models';
import { NotFoundError } from 'app/lib/errors';

const { Op } = sequelize;

export class HomeController {
  /**
   * Create a new HomeController instance.
   *
   * @return {mix}
   */
  constructor(models) {
    this.models = models;

    autoBind(this);
  }

  /**
   * Show landing page.
   *
   * @param  {Express.Request}  request
   * @param  {Express.Response} response
   * @param  {function}         next
   * @return {Express.Response}
   */
  showHomePage(request, response, next) {
    response.render('tojem/homepage');
  }

  /**
   * Show search page.
   *
   * @param  {Express.Request}  request
   * @param  {Express.Response} response
   * @param  {function}         next
   * @return {Express.Response}
   */
  showSearchPage(request, response, next) {
    const opts = {
      include: [this.models.store, this.models.productImage],
    };
    const query = request.query.q || '';

    if (query) {
      opts.where = {
        [Op.or]: [
          { name: { [Op.like]: `%${query}%` } },
          { description: { [Op.like]: `%${query}%` } },
        ],
      };
    }

    this.models.product.findAll(opts)
      .then((products) => {
        const data = {
          products,
          query,
          appId: process.env.FACEBOOK_APP_ID,
        };

        response.render('tojem/search-result', data);
      })
      .catch((error) => {
        next(error);
      });
  }

  showProductDetailPage(request, response, next) {
    this.models.product.findById(request.params.id, {
      include: [this.models.store, this.models.productImage],
    })
      .then((product) => {
        if (!product) {
          return next(new NotFoundError('Item yang dimaksud tidak ditemukan'));
        }

        return response.render('tojem/product-detail', { product });
      })
      .catch((error) => {
        next(error);
      });
  }
}

export default new HomeController(dbModels);
