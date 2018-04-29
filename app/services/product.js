import dbModels from 'app/models';

export class ProductService {
  /**
   * Create a new ProductService instance.
   *
   * @param  {Tojem.Model} models
   * @return {mix}
   */
  constructor(models) {
    this.models = models;
  }

  /**
   * Find all products by spesific store
   *
   * @param  {Tojem.Model.Store} store
   * @return {Tojem.Model.Product[]}
   */
  findAllByStore(store) {
    return this.models.product.findAll({
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
  }) {
    return this.models.product.create({
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
    return this.models.product.findById(productId, {
      // Need to figure it out, about how to test include argument
      include: [
        { model: dbModels.productImage },
      ],
    });
  }

  addImages(images) {
    return Promise.all(images.map(image => dbModels.productImage.create(image)));
  }
}

export default new ProductService(dbModels);
