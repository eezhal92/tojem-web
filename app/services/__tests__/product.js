import { ProductService } from '../product';

describe('services/product', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  const db = {
    product: {
      findAll: jest.fn(() => Promise.resolve()),
      create: jest.fn(data => Promise.resolve(data)),
      findById: jest.fn(() => Promise.resolve()),
    },
  };
  const productService = new ProductService(db);

  describe('findAllByStore', () => {
    const store = { id: 2 };

    it('should be functioning properly', async () => {
      await productService.findAllByStore(store);

      expect(db.product.findAll).toBeCalledWith({ where: { storeId: store.id } });
      expect(db.product.findAll).toHaveBeenCalledTimes(1);
    });

    it('should throw error when model fail to perform operation', async () => {
      db.product.findAll.mockImplementationOnce(() => Promise.reject(new Error('Cannot connect to db')));

      await expect(productService.findAllByStore(store)).rejects.toThrow('Cannot connect to db');
      expect(db.product.findAll).toBeCalledWith({ where: { storeId: store.id } });
      expect(db.product.findAll).toHaveBeenCalledTimes(1);
    });
  });

  describe('create', () => {
    const data = {
      storeId: 1,
      name: 'Pizza',
      description: 'Nom',
      price: 15,
    };

    it('should be functioning properly', async () => {
      await productService.create(data);

      expect(db.product.create).toBeCalledWith(data);
      expect(db.product.create).toHaveBeenCalledTimes(1);
    });

    it('should throw error when model fail to perform operation', async () => {
      db.product.create.mockImplementationOnce(() => Promise.reject(new Error('Cannot connect to db')));

      await expect(productService.create(data)).rejects.toThrow('Cannot connect to db');
      expect(db.product.create).toBeCalledWith(data);
      expect(db.product.create).toHaveBeenCalledTimes(1);
    });
  });

  describe('findById', () => {
    const productId = 5;

    it('should be functioning properly', async () => {
      await productService.findById(productId);

      expect(db.product.findById).toHaveBeenCalledTimes(1);
    });
  });
});
