import autoBind from 'auto-bind';
import ps from 'app/services/product';

class ProductApiController {
  /**
   * Create a new ProductApiController instance.
   *
   * @param  {Tojem.Service.ProductServive} productService
   * @return {mix}
   */
  constructor(productService) {
    this.productService = productService;

    autoBind(this);
  }

  /**
   * Retrieve all product associated store.
   *
   * @param  {express.Request}  request
   * @param  {express.Response} response
   * @param  {function}         next
   * @return {mix}
   */
  showAll(request, response, next) {
    const { store } = request.session;

    this.productService
      .findAllByStore(store)
      .then((products) => response.json(products))
      .catch((error) => {
        next(error);
      });
  }

  uploadImage(request, response, next) {
    this.productService.addImages(request.file.images).then((images) => {
      response.json({ images });
    });
  }

  removeImage(request, response, next) {
    this.productService.removeImage(request.params.imageId).then(() => {
      response.json({ message: 'Gambar berhasil di hapus.' });
    });
  }

  /**
   * Persistence product into database.
   *
   * @param  {Express.Request}  request
   * @param  {Express.Response} response
   * @param  {function}         next
   * @return {Express.Response}
   */
  store(request, response, next) {
    const storeId = request.session.store.id;
    const data = {
      storeId,
      ...request.body,
    };

    this.productService
      .create(data)
      .then((product) => {
        return response.json({
          status: { code: 200, codename: 'success' },
          messages: 'Produk telah ditambahkan',
          data: product,
        });
      })
      .catch((error) => {
        next(error);
      });
  }
}

export default new ProductApiController(ps);
