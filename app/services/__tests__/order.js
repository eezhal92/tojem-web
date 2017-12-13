import { ORDER_TYPE_ON_SITE, ORDER_CHANNEL_OFFLINE } from 'app/lib/order';

import { OrderService } from '../order';

describe('services/order', () => {
  describe('saveOrderItems', () => {
    const db = {
      orderItem: {
        create: jest.fn(item => Promise.resolve(item)),
      },
    };

    it('should create order items', async () => {
      const orderService = new OrderService(db);

      const order = { id: 100, type: 'on_site', channel: 'offline' };
      const items = [
        {
          id: 1,
          name: 'Fried Noodle',
          price: 10,
          qty: 2,
        },
        {
          id: 2,
          name: 'Fried Chicken',
          price: 20,
          qty: 1,
        },
      ];

      const orderItems = await orderService.saveOrderItems(order, items);

      expect(orderItems).toEqual([
        {
          orderId: 100, productId: 1, productName: 'Fried Noodle', productPrice: 10, qty: 2,
        },
        {
          orderId: 100, productId: 2, productName: 'Fried Chicken', productPrice: 20, qty: 1,
        },
      ]);
      expect(db.orderItem.create).toHaveBeenCalledTimes(2);
      expect(db.orderItem.create.mock.calls).toEqual([
        [{
          orderId: 100, productId: 1, productName: 'Fried Noodle', productPrice: 10, qty: 2,
        }],
        [{
          orderId: 100, productId: 2, productName: 'Fried Chicken', productPrice: 20, qty: 1,
        }],
      ]);
    });

    it('should throw error when model fail to perform operation', async () => {
      db.orderItem.create.mockImplementationOnce(() => Promise.reject(new Error('There is no order_items table')));

      const orderService = new OrderService(db);

      const order = { id: 100, type: 'on_site', channel: 'offline' };
      const items = [
        {
          id: 1,
          name: 'Fried Noodle',
          price: 10,
          qty: 2,
        },
        {
          id: 2,
          name: 'Fried Chicken',
          price: 20,
          qty: 1,
        },
      ];

      await expect(orderService.saveOrderItems(order, items)).rejects.toThrow('There is no order_items table');
    });
  });

  describe('createOnSiteOrder', () => {
    const resolvedOrder = {
      type: ORDER_TYPE_ON_SITE,
      channel: ORDER_CHANNEL_OFFLINE,
    };

    const db = {
      order: {
        create: jest.fn(() => Promise.resolve(resolvedOrder)),
      },
      orderItem: {
        create: () => {},
      },
    };

    it('should create offline, on_site order', async () => {
      const orderService = new OrderService(db);
      const saveOrderItemsSpy = jest.spyOn(orderService, 'saveOrderItems');

      const items = [
        {
          id: 1,
          name: 'Fried Noodle',
          price: 10,
          qty: 2,
        },
      ];

      await orderService.createOnSiteOrder(items);

      expect(db.order.create).toBeCalledWith({
        type: ORDER_TYPE_ON_SITE,
        channel: ORDER_CHANNEL_OFFLINE,
      });
      expect(saveOrderItemsSpy).toBeCalledWith(resolvedOrder, items);
    });

    it('should throw error when model fail to perform operation', async () => {
      db.order.create.mockImplementationOnce(() => Promise.reject(new Error('Unexpected error')));

      const orderService = new OrderService(db);
      const saveOrderItemsSpy = jest.spyOn(orderService, 'saveOrderItems');

      const items = [
        {
          id: 1,
          name: 'Fried Noodle',
          price: 10,
          qty: 2,
        },
      ];

      await expect(orderService.createOnSiteOrder(items)).rejects.toThrow('Unexpected error');

      expect(db.order.create).toBeCalledWith({
        type: ORDER_TYPE_ON_SITE,
        channel: ORDER_CHANNEL_OFFLINE,
      });
      expect(saveOrderItemsSpy).not.toBeCalled();
    });
  });
});
