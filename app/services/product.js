import database from '../models';

class ProductService {
  constructor(db) {
    this.database = db;
  }

  /**
   * Find all products by spesific store
   *
   * @param  {Tojem.Model.Store} store
   * @return {Tojem.Product[]}
   */
  async findAllByStore(store) {
    try {
      return await this.database.product.findAll({
        where: { storeId: store.id },
      });
    } catch (error) {
      throw error;
    }
  }

  /**
   * Create a new product.
   *
   * @param  {number} options.storeId
   * @param  {string} options.name
   * @param  {string} options.description
   * @param  {number} options.price
   * @return {Tojem.Model.Product}
   */
  async create({
    storeId,
    name,
    description,
    price,
  } = {}) {
    try {
      const product = await this.database.product.create({
        storeId,
        name,
        price,
        description,
      });

      return product;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Find product by its ID.
   *
   * @param  {number} productId
   * @return {Tojem.Model.Product}
   */
  async findById(productId) {
    try {
      return await this.database.product.findById(productId);
    } catch (error) {
      throw error;
    }
  }
}

export default new ProductService(database);
