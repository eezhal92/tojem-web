import autoBind from 'auto-bind';

import os from 'app/services/order';
import { summaryForSales } from 'app/lib/order';
import convertToDates from 'app/lib/date-range';

class ReportController {
  constructor(orderService) {
    this.orderService = orderService;

    autoBind(this);
  }

  async orders(request, response, next) {
    try {
      const dateCode = request.query.date_code;
      const { startDate, endDate } = convertToDates(dateCode);

      const orders = await this.orderService.findAllForStoreWithinRange({
        storeId: request.session.store.id,
        startDate,
        endDate,
        withItems: true,
      });

      return response.json({
        query: { dateCode, startDate, endDate },
        result: summaryForSales({ startDate, endDate, orders }),
      });
    } catch (error) {
      return next(error);
    }
  }
}

export default new ReportController(os);
