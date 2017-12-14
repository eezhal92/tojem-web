import { productService as ps } from 'app/services';

class Product {
  constructor(productService) {
    this.productService = productService;

    this.showAll = this.showAll.bind(this);
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
