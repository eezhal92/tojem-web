import autoBind from 'auto-bind';

import os from 'app/services/order';

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
    response.render('backstore/report/dashboard');
  }
}

export default new ReportController(os);
