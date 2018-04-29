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

    this.productService.findAllByStore(store)
      .then(products => response.json(products))
      .catch((error) => {
        next(error);
      });
  }

  uploadImage(request, response, next) {
    this.productService.addImages(request.file.images)
      .then((images) => {
        response.json({ images });
      });
  }

  removeImage(request, response, next) {
    this.productService.removeImage(request.params.imageId)
      .then(() => {
        response.json({ message: 'Gambar berhasil di hapus.' });
      });
  }
}

export default new ProductApiController(ps);
