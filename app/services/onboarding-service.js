import model from '../models';

export class OnBoardingService {
  /**
   * Create a new OnBoardingService instance.
   *
   * @param  {Tojem.Model} database
   * @return {void}
   */
  constructor(database) {
    this.database = database;
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

    return this.database.store.create(data);
  }
}

export default new OnBoardingService(model);
