import autoBind from 'auto-bind';
import { productService as ps } from 'app/services';

class Product {
  constructor(productService) {
    this.productService = productService;

    autoBind(this);
  }

  showAll(request, response, next) {
    const { store } = request.session;

    this.productService.findAllByStore(store)
      .then(products => response.json(products))
      .catch((error) => {
        next(error);
      });
  }
}

export default new Product(ps);
