/* eslint class-methods-use-this: [2, { exceptMethods: [
  showTransactionForm
]}] */

import autoBind from 'auto-bind';

export class PointOfSalesController {
  /**
   * Create a new PointOfSales instance.
   *
   * @return {void}
   */
  constructor() {
    autoBind(this);
  }

  /**
   * Show transaction form.
   *
   * @param  {Express.Request}  request
   * @param  {Express.Response} response
   * @return {Express.Response}
   */
  showTransactionForm(request, response) {
    response.render('backstore/point-of-sales/create');
  }
}

export default new PointOfSalesController();
