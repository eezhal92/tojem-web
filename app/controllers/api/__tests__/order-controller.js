import { AuthorizationError } from 'app/lib/errors';
import { ORDER_TYPE_ON_SITE, ORDER_TYPE_COD, InvalidOrderTypeError } from 'app/lib/order';

import { OrderApiController } from '../order-controller';

describe('app/controllers/api/order-controller', () => {
  const authorizationError = new AuthorizationError();

  const orderService = {
    createOnSiteOrder: jest.fn().mockImplementation(() => Promise.resolve()),
    createCashOnDeliveryOrder: jest.fn().mockImplementation(() => Promise.resolve()),
  };

  const request = {};
  const response = {
    json: jest.fn(),
  };
  const next = jest.fn();

  beforeEach(() => {
    jest.resetAllMocks();
  });

  describe('.processTransaction', () => {
    it('should call `next` with AuthorizationError when request is not initiated by user', async () => {
      request.user = null;
      request.body = { type: ORDER_TYPE_ON_SITE };

      const orderApi = new OrderApiController(orderService);

      await orderApi.processTransaction(request, response, next);

      expect(orderService.createOnSiteOrder).not.toBeCalled();
      expect(orderService.createCashOnDeliveryOrder).not.toBeCalled();
      expect(response.json).not.toBeCalled();
      expect(next).toBeCalledWith(authorizationError);
      expect(next).toHaveBeenCalledTimes(1);
    });

    it('should call `next` with InvalidOrderTypeError when type payload is not valid order type', async () => {
      request.user = {};
      request.body = { type: 'random_invalid_type' };

      const orderApi = new OrderApiController(orderService);

      await orderApi.processTransaction(request, response, next);

      expect(orderService.createOnSiteOrder).not.toBeCalled();
      expect(orderService.createCashOnDeliveryOrder).not.toBeCalled();
      expect(response.json).not.toBeCalled();
      expect(next).toBeCalledWith(new InvalidOrderTypeError("Type of 'random_invalid_type' is not valid type"));
      expect(next).toHaveBeenCalledTimes(1);
    });

    it('should process on site order when `type` payload  is `on_site`', async () => {
      request.user = { id: 1 };
      request.body = { items: [], type: ORDER_TYPE_ON_SITE };

      const orderApi = new OrderApiController(orderService);

      await orderApi.processTransaction(request, response, next);

      expect(orderService.createOnSiteOrder).toBeCalledWith(request.body.items);
      expect(orderService.createOnSiteOrder).toHaveBeenCalledTimes(1);
      expect(orderService.createCashOnDeliveryOrder).not.toBeCalled();

      expect(response.json).toBeCalledWith({ message: 'Order has been created' });
      expect(response.json).toHaveBeenCalledTimes(1);
      expect(next).not.toBeCalled();
    });

    it('should process cash on delivery order when `type` payload  is `cod`', async () => {
      request.user = { id: 1 };
      request.body = { items: [], type: ORDER_TYPE_COD };

      const orderApi = new OrderApiController(orderService);

      await orderApi.processTransaction(request, response, next);

      expect(orderService.createCashOnDeliveryOrder).toBeCalledWith(request.body.items);
      expect(orderService.createCashOnDeliveryOrder).toHaveBeenCalledTimes(1);
      expect(orderService.createOnSiteOrder).not.toBeCalled();

      expect(response.json).toBeCalledWith({ message: 'Order has been created' });
      expect(response.json).toHaveBeenCalledTimes(1);
      expect(next).not.toBeCalled();
    });
  });
});
