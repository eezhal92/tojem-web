import store from '../store';

describe('middlewares/store', () => {
  const request = {
    user: { id: 1 },
  };
  const response = { redirect: jest.fn() };
  const error = new Error('Operation is broken');
  const db = {
    Store: {
      findAll: () => Promise.reject(error),
    },
  };
  const next = jest.fn();

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should call next with error when operation is broken', async () => {
    const middleware = store(db);

    await middleware(request, response, next);

    expect(next).toBeCalledWith(error);
    expect(next).toHaveBeenCalledTimes(1);
    expect(response.redirect).not.toBeCalled();
  });

  it('should call next when condition does not meet', async () => {
    db.Store.findAll = () => Promise.resolve([]);

    let middleware;

    middleware = store(db, { condition: true, redirectPath: '/' });

    await middleware(request, response, next);

    expect(next).toHaveBeenCalledTimes(1);
    expect(response.redirect).not.toBeCalled();

    db.Store.findAll = () => Promise.resolve([{ id: 1, name: 'Cool Store' }]);

    middleware = store(db, { condition: false, redirectPath: '/' });

    await middleware(request, response, next);

    expect(next).toHaveBeenCalledTimes(2);
    expect(response.redirect).not.toBeCalled();
  });

  it('should call redirect when condition does meet', async () => {
    db.Store.findAll = () => Promise.resolve([]);

    let middleware;

    middleware = store(db, { condition: false, redirectPath: '/' });

    await middleware(request, response, next);

    expect(next).not.toBeCalled();
    expect(response.redirect).toBeCalledWith('/');
    expect(response.redirect).toHaveBeenCalledTimes(1);

    db.Store.findAll = () => Promise.resolve([{ id: 1, name: 'Cool Store' }]);

    middleware = store(db, { condition: true, redirectPath: '/somewhere' });

    await middleware(request, response, next);

    expect(next).not.toBeCalled();
    expect(response.redirect).toBeCalledWith('/somewhere');
    expect(response.redirect).toHaveBeenCalledTimes(2);
  });
});