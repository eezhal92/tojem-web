import { Op } from 'sequelize';

import {
  ORDER_TYPE_COD,
  ORDER_TYPE_ON_SITE,
  ORDER_CHANNEL_ONLINE,
  ORDER_CHANNEL_OFFLINE,
} from 'app/lib/order';

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
    const storeId = 100;
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

      await orderService.createOnSiteOrder(storeId, items);

      expect(db.order.create).toBeCalledWith({
        storeId,
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

      await expect(orderService.createOnSiteOrder(storeId, items)).rejects.toThrow('Unexpected error');

      expect(db.order.create).toBeCalledWith({
        storeId,
        type: ORDER_TYPE_ON_SITE,
        channel: ORDER_CHANNEL_OFFLINE,
      });
      expect(saveOrderItemsSpy).not.toBeCalled();
    });
  });

  describe('createCashOnDeliveryOrder', () => {
    const storeId = 100;
    const resolvedOrder = {
      type: ORDER_TYPE_COD,
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

    it('should create offline, cod order', async () => {
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

      await orderService.createCashOnDeliveryOrder(storeId, items);

      expect(db.order.create).toBeCalledWith({
        storeId,
        type: ORDER_TYPE_COD,
        channel: ORDER_CHANNEL_ONLINE,
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

      await expect(orderService.createCashOnDeliveryOrder(storeId, items)).rejects.toThrow('Unexpected error');

      expect(db.order.create).toBeCalledWith({
        storeId,
        type: ORDER_TYPE_COD,
        channel: ORDER_CHANNEL_ONLINE,
      });
      expect(saveOrderItemsSpy).not.toBeCalled();
    });
  });

  describe('findAllForStoreWithinRange', () => {
    const db = {
      orderItem: {},
      order: {
        findAll: jest.fn(() => Promise.resolve([])),
      },
    };

    it('should not include order items when withItems is false', async () => {
      const storeId = 1;
      const startDate = '2018-01-01';
      const endDate = '2018-01-07';

      const orderService = new OrderService(db);

      await orderService.findAllForStoreWithinRange({
        storeId,
        startDate,
        endDate,
      });

      expect(db.order.findAll).toBeCalledWith({
        where: {
          storeId,
          createdAt: {
            [Op.between]: [startDate, endDate],
          },
        },
      });
    });

    it('should include order items when withItems is true', async () => {
      const storeId = 1;
      const startDate = '2018-01-01';
      const endDate = '2018-01-07';
      const withItems = true;

      const orderService = new OrderService(db);

      await orderService.findAllForStoreWithinRange({
        storeId,
        startDate,
        endDate,
        withItems,
      });

      expect(db.order.findAll).toBeCalledWith({
        where: {
          storeId,
          createdAt: {
            [Op.between]: [startDate, endDate],
          },
        },
        include: [db.orderItem],
      });
    });
  });
});
