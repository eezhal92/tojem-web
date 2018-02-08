import autoBind from 'auto-bind';

export class PointOfSalesController {
  /**
   * Create a new PointOfSalesController instance.
   *
   * @return {mix}
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
