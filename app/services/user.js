import autoBind from 'auto-bind';
import dbModels from 'app/models';

import product from './product';

export class UserService {
  constructor(models) {
    this.models = models;

    autoBind(this);
  }

  async getAllProduct() {
    try {
      const products = await product.findAllByStore({ id: this.user.store.id });

      return products;
    } catch (error) {
      throw error;
    }
  }


  getStore() {
    return this.user.store;
  }

  getEmail() {
    return this.user.email;
  }
}

export default new UserService(dbModels);
