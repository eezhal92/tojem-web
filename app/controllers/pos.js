/* eslint class-methods-use-this: [2, { exceptMethods: [
  showTransactionForm, processTransaction
]}] */

import autoBind from 'auto-bind';

export class PointOfSales {
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
    response.render('backstore/pos/create');
  }

  /**
   * Process transaction.
   *
   * @param  {Express.Request}  request
   * @param  {Express.Response} response
   * @param  {function}         next
   * @return {Express.Response}
   */
  processTransaction(request, response, next) {
    // ...
  }
}

export default new PointOfSales();
