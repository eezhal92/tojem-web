import autoBind from 'auto-bind';
import sequelize from 'sequelize';

import models from 'app/models';
import { NotFoundError } from 'app/lib/errors';

const { Op } = sequelize;

export class HomeController {
  /**
   * Create a new HomeController instance.
   *
   * @return {mix}
   */
  constructor() {
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
      include: [models.store],
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

    models.product.findAll(opts)
      .then((products) => {
        const data = {
          products,
          user: request.user,
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
    models.product.findById(request.params.id, {
      include: [models.store],
    })
      .then((product) => {
        if (!product) {
          return next(new NotFoundError('Item yang dimaksud tidak ditemukan'));
        }

        const data = {
          user: request.user,
          product,
        };

        return response.render('tojem/product-detail', data);
      })
      .catch((error) => {
        next(error);
      });
  }
}

export default new HomeController();
