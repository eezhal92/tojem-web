import { ORDER_TYPE_ON_SITE } from 'app/lib/order';
import { AuthorizationError } from 'app/lib/errors';
import { OrderApi } from '../order';

describe('app/controllers/api/order', () => {
  const authorizationError = new AuthorizationError();
  const orderService = {
    createOnSiteOrder: jest.fn().mockImplementation(() => Promise.resolve()),
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
    it('should call `.json` after response payloads', async () => {
      request.user = { id: 1 };
      request.body = { items: [], type: ORDER_TYPE_ON_SITE };

      const orderApi = new OrderApi(orderService);

      await orderApi.processTransaction(request, response, next);

      expect(orderService.createOnSiteOrder).toBeCalledWith(request.body.items);
      expect(orderService.createOnSiteOrder).toHaveBeenCalledTimes(1);

      expect(response.json).toBeCalledWith({ message: 'Order has been created' });
      expect(response.json).toHaveBeenCalledTimes(1);
      expect(next).not.toBeCalled();
    });

    it('should call `next` by giving invalid request user', async () => {
      request.user = null;
      request.body = { type: ORDER_TYPE_ON_SITE };

      const orderApi = new OrderApi(orderService);

      await orderApi.processTransaction(request, response, next);

      expect(orderService.createOnSiteOrder).not.toBeCalled();
      expect(response.json).not.toBeCalled();
      expect(next).toBeCalledWith(authorizationError);
      expect(next).toHaveBeenCalledTimes(1);
    });
  });
});
