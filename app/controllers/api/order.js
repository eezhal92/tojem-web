import os from 'app/services/order';
import { ORDER_TYPE_ON_SITE, validateOrder } from 'app/lib/order';

class Order {
  constructor(orderService) {
    this.orderService = orderService;

    this.processTransaction = this.processTransaction.bind(this);
  }

  // eslint-disable-next-line
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

export default new Order(os);
