import dbModels from 'app/models';
import { ORDER_TYPE_ON_SITE, ORDER_TYPE_COD, ORDER_CHANNEL_OFFLINE } from 'app/lib/order';

export class OrderService {
  /**
   * Create a new OrderService instance.
   *
   * @param  {Tojem.Model} models
   * @return {mix}
   */
  constructor(models) {
    this.models = models;
  }

  /**
   * Create a new transaction provided 'on-site'.
   *
   * @param  number      storeId
   * @param  {object[]}  items
   * @return {mix}
   *
   * @throws {Error}
   */
  async createOnSiteOrder(storeId, items = []) {
    try {
      const order = await this.models.order.create({
        storeId,
        channel: ORDER_CHANNEL_OFFLINE,
        type: ORDER_TYPE_ON_SITE,
      });

      await this.saveOrderItems(order, items);

      return order;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Create a new transaction provided 'cash on delivery'.
   *
   * @param  number      storeId
   * @param  {object[]}  items
   * @return {mix}
   *
   * @throws {Error}
   */
  async createCashOnDeliveryOrder(storeId, items = []) {
    try {
      const order = await this.models.order.create({
        storeId,
        channel: ORDER_CHANNEL_OFFLINE,
        type: ORDER_TYPE_COD,
      });

      await this.saveOrderItems(order, items);

      return order;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Persistence order transaction into database.
   * @param  {objec}    order
   * @param  {object[]} items
   * @return {Promise}
   *
   * @throws {Error}
   */
  async saveOrderItems(order, items) {
    try {
      const promises = items.map(item => this.models.orderItem.create({
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

export default new OrderService(dbModels);
