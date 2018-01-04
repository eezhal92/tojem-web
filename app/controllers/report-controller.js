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
        const list = orders.map((o) => {
          const order = o.dataValues;

          order.totalAmount = order.orderItems
            .map(orderItem => orderItem.productPrice)
            .reduce((acc, price) => acc + price, 0);

          return order;
        });

        const data = {
          ordersNumber: list.length,
          ordersAmount: list
            .map(order => order.totalAmount)
            .reduce((acc, amount) => acc + amount, 0),
          orders: list,
        };

        response.render('backstore/report/dashboard', data);
      })
      .catch((error) => {
        next(error);
      });
  }
}

export default new ReportController(os);
