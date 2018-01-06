/* eslint class-methods-use-this: [2, { exceptMethods: [getDashboard] }] */

import autoBind from 'auto-bind';
import os from 'app/services/order';
import models from 'app/models';
import { NotFoundError, UnprocessableEntityError } from 'app/lib/errors';

export class ReportController {
  /**
   * Create a new ReportController instance.
   *
   * @param  {Tojem.Service.OrderService} orderService
   * @return {mix}
   */
  constructor(orderService) {
    this.orderService = orderService;

    autoBind(this);
  }

  getDashboard(request, response, next) {
    models.order.findAll({
      where: { storeId: 1 },
      include: [{
        model: models.orderItem,
      }],
    })
      .then((orders) => {
        response.render('backstore/report/dashboard');
      })
      .catch((error) => {
        next(error);
      });
  }
}

export default new ReportController(os);
