import auth from 'app/lib/auth';

import { ProductController } from '../product-controller';

describe('app/controllers/product-controller', () => {
  const testSessionId = 'test-session-id';

  auth.user = {
    getAllProduct: jest.fn(() => Promise.resolve([])),
  };

  const next = jest.fn();
  const request = {
    session: {
      id: testSessionId,
    },
  };
  const response = {
    render: jest.fn(),
    redirect: jest.fn(),
  };

  const productService = {
    create: jest.fn(n => Promise.resolve(n)),
    findById: jest.fn(n => Promise.resolve(n)),
    findAllByStore: jest.fn(() => Promise.resolve([])),
  };

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should call `.render` to show all product lists', async () => {
    auth.user.getAllProduct.mockImplementation(() => Promise.resolve([]));

    const product = new ProductController(productService);

    await Promise.resolve()
      .then(product.showAll(request, response, next));

    expect(response.render).toBeCalledWith('backstore/product/list', { products: [] });
    expect(response.render).toHaveBeenCalledTimes(1);
    expect(next).not.toBeCalled();
  });

  it('should call `next` if no authenticated user', async () => {
    const error = new Error('Unauthorized');

    auth.user.getAllProduct.mockImplementation(() => Promise.reject(error));

    const product = new ProductController(productService);

    await Promise.resolve()
      .then(product.showAll(request, response, next));

    expect(response.render).not.toBeCalled();
    expect(next).toBeCalledWith(error);
    expect(next).toHaveBeenCalledTimes(1);
  });
});
