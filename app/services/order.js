import database from '../models';
import { ORDER_TYPE_ON_SITE, ORDER_CHANNEL_OFFLINE } from '../lib/order';

class OrderService {
  constructor(db) {
    this.database = db;
  }

  async createOnSiteOrder(items = []) {
    try {
      const order = await this.database.order.create({
        channel: ORDER_CHANNEL_OFFLINE,
        type: ORDER_TYPE_ON_SITE,
      });

      await this.saveOrderItems(order, items);

      return order;
    } catch (error) {
      throw error;
    }
  }

  async saveOrderItems(order, items) {
    try {
      const promises = items.map(item => this.database.orderItem.create({
        orderId: order.id,
        productId: item.id,
        productName: item.name,
        productPrice: item.price,
        qty: item.qty,
      }));

      return await Promise.all(promises);
    } catch (error) {
      throw error;
    }
  }
}

export default new OrderService(database);
