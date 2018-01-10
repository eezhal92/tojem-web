import { storeSession, hasStore } from '../store';

describe('middlewares/store', () => {
  const request = {
    user: { id: 1 },
    session: {},
  };
  const userStore = { id: 1, name: 'Central Perk' };
  const response = { redirect: jest.fn() };
  const error = new Error('Operation is broken');
  const db = {
    store: {},
  };
  const next = jest.fn();

  beforeEach(() => {
    jest.resetAllMocks();
  });

  describe('storeSession', () => {
    it('should call next with error when operation is broken', async () => {
      db.store.findAll = () => Promise.reject(error);

      const middleware = storeSession(db);

      await middleware(request, response, next);

      expect(next).toBeCalledWith(error);
      expect(next).toHaveBeenCalledTimes(1);
      expect(response.redirect).not.toBeCalled();
    });

    it('should set store into session when store is found', async () => {
      db.store.findAll = () => Promise.resolve([
        { dataValues: userStore },
      ]);

      const middleware = storeSession(db);

      await middleware(request, response, next);

      expect(request.session.store).toEqual(userStore);
      expect(next).toBeCalled();
    });
  });

  describe('hasStore', () => {
    it('should call next with error when operation is broken', async () => {
      db.store.findAll = () => Promise.reject(error);

      const middleware = hasStore(db);

      await middleware(request, response, next);

      expect(next).toBeCalledWith(error);
      expect(next).toHaveBeenCalledTimes(1);
      expect(response.redirect).not.toBeCalled();
    });

    it('should call next when condition does not meet', async () => {
      db.store.findAll = () => Promise.resolve([]);

      let middleware;

      middleware = hasStore(db, { condition: true, redirectPath: '/' });

      await middleware(request, response, next);

      expect(next).toHaveBeenCalledTimes(1);
      expect(response.redirect).not.toBeCalled();

      db.store.findAll = () => Promise.resolve([{ id: 1, name: 'Cool Store' }]);

      middleware = hasStore(db, { condition: false, redirectPath: '/' });

      await middleware(request, response, next);

      expect(next).toHaveBeenCalledTimes(2);
      expect(response.redirect).not.toBeCalled();
    });

    it('should call redirect when condition does meet', async () => {
      db.store.findAll = () => Promise.resolve([]);

      let middleware;

      middleware = hasStore(db, { condition: false, redirectPath: '/' });

      await middleware(request, response, next);

      expect(next).not.toBeCalled();
      expect(response.redirect).toBeCalledWith('/');
      expect(response.redirect).toHaveBeenCalledTimes(1);

      db.store.findAll = () => Promise.resolve([{ id: 1, name: 'Cool Store' }]);

      middleware = hasStore(db, { condition: true, redirectPath: '/somewhere' });

      await middleware(request, response, next);

      expect(next).not.toBeCalled();
      expect(response.redirect).toBeCalledWith('/somewhere');
      expect(response.redirect).toHaveBeenCalledTimes(2);
    });
  });
});
