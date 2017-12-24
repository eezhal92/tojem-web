import dbModels from 'app/models';

export class OnBoardingService {
  /**
   * Create a new OnBoardingService instance.
   *
   * @param  {Tojem.Model} models
   * @return {mix}
   */
  constructor(models) {
    this.models = models;
  }

  /**
   * Create a new record into `store` table.
   *
   * @param  {object}            input
   * @return {Tojem.Model.Store}
   */
  create(input) {
    const data = {
      ownerId: null,
      name: null,
      location: null,
      address: null,
      ...input,
    };

    return this.models.store.create(data);
  }
}

export default new OnBoardingService(dbModels);
