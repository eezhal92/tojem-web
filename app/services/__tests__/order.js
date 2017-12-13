import { OrderService } from '../order';

describe('services/order', () => {
  describe('saveOrderItems', () => {
    it('should create order items', async () => {
      const db = {
        orderItem: {
          create: jest.fn(item => Promise.resolve(item)),
        },
      };

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
  });

  describe('createOnSiteOrder', () => {
    const resolvedOrder = {
      type: 'on_site',
      channel: 'offline',
    };

    it('should create offline, on_site order', async () => {
      const db = {
        order: {
          create: jest.fn(() => Promise.resolve(resolvedOrder)),
        },
        orderItem: {
          create: () => {},
        },
      };

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

      expect(db.order.create).toBeCalledWith({ type: 'on_site', channel: 'offline' });
      expect(saveOrderItemsSpy).toBeCalledWith(resolvedOrder, items);
    });
  });
});
