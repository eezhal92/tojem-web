import dbModels from 'app/models';
import { bucket } from 'app/lib/images';

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
    basePrice,
    profit,
  } = {}) {
    return this.models.product.create({
      storeId,
      name,
      basePrice,
      profit,
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
      include: [{ model: dbModels.productImage }],
    });
  }

  addImages(images) {
    return Promise.all(images.map(image => dbModels.productImage.create(image)));
  }

  removeImage(imageId) {
    return this.models.productImage
      .findById(imageId)
      .then((image) => {
        if (!image) {
          throw new Error(`Image ${imageId} was not found`);
        }

        const { productId, type: size } = image;

        const file = bucket.file(image.name);
        file.delete();

        return image.destroy();
      })
      .catch((error) => {
        throw error;
      });
  }
}

export default new ProductService(dbModels);
