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
}

export default new ProductApiController(ps);
