import autoBind from 'auto-bind';
import os from 'app/services/order';
import { ORDER_TYPE_ON_SITE, ORDER_TYPE_COD, validateOrder } from 'app/lib/order';

export class OrderApiController {
  /**
   * Create a new OrderApiController instance.
   *
   * @param  {Tojem.Service.OrderService} orderService
   * @return {mix}
   */
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

      // Todo: it should only take product's id and qty
      // and rest data like basePrice, profit etc
      // should be loaded from database.

      validateOrder(type, request);

      const storeId = request.session.store.id;

      if (type === ORDER_TYPE_ON_SITE) {
        this.orderService.createOnSiteOrder(storeId, items);
      } else if (type === ORDER_TYPE_COD) {
        this.orderService.createCashOnDeliveryOrder(storeId, items);
      }

      response.json({ message: 'Order has been created' });
    } catch (error) {
      next(error);
    }
  }
}

export default new OrderApiController(os);
