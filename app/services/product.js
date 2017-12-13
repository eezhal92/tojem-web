import database from '../models';

export class ProductService {
  constructor(db) {
    this.database = db;
  }

  /**
   * Find all products by spesific store
   *
   * @param  {Tojem.Model.Store} store
   * @return {Tojem.Product[]}
   */
  findAllByStore(store) {
    return this.database.product.findAll({
      where: { storeId: store.id },
    });
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
  create({
    storeId,
    name,
    description,
    price,
  } = {}) {
    return this.database.product.create({
      storeId,
      name,
      price,
      description,
    });
  }

  /**
   * Find product by its ID.
   *
   * @param  {number} productId
   * @return {Tojem.Model.Product}
   */
  findById(productId) {
    return this.database.product.findById(productId);
  }
}

export default new ProductService(database);
