import autoBind from 'auto-bind';
import os from 'app/services/order';
import { ORDER_TYPE_ON_SITE, validateOrder } from 'app/lib/order';

export class OrderApi {
  constructor(orderService) {
    this.orderService = orderService;

    autoBind(this);
  }

  /**
   * Process order transaction.
   *
   * @param  {Express.Request}  request
   * @param  {Express.Response} response
   * @param  {function}         next
   * @return {Express.Response}
   */
  async processTransaction(request, response, next) {
    try {
      const { type, items } = request.body;

      validateOrder(type, request);

      if (type === ORDER_TYPE_ON_SITE) {
        this.orderService.createOnSiteOrder(items);
      }

      response.json({ message: 'Order has been created' });
    } catch (error) {
      next(error);
    }
  }
}

export default new OrderApi(os);
