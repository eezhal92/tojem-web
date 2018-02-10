import dbModels from 'app/models';

export class StoreService {
  constructor(models) {
    this.models = models;
  }

  async getStoreByUser(user) {
    try {
      let store = null;

      const stores = await this.models.store.findAll({ where: { ownerId: user.id } });

      if (Array.isArray(stores) && stores.length) {
        store = stores[0].dataValues;
      }

      return store;
    } catch (error) {
      throw error;
    }
  }
}

export default new StoreService(dbModels);
