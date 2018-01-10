/* eslint class-methods-use-this: [2, { exceptMethods: [showDashboard] }] */

import autoBind from 'auto-bind';

import os from 'app/services/order';
import viewData from 'app/lib/view-data';

export class ReportController {
  /**
   * Create a new ReportController instance.
   *
   * @param  {Tojem.Service.OrderService} orderService
   * @return {mix}
   */
  constructor(orderService) {
    this.orderService = orderService;

    autoBind(this);
  }

  showDashboard(request, response) {
    const data = viewData.wrapForRequest(request);

    response.render('backstore/report/dashboard', data);
  }
}

export default new ReportController(os);
