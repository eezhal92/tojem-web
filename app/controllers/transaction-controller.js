import autoBind from 'auto-bind';
import sequelize from 'sequelize';
import format from 'date-fns/format';

import models from 'app/models';
import paginateMeta from 'app/lib/pagination';
import { NotFoundError } from 'app/lib/errors';
import { mapForList, orderItemsAmount } from 'app/lib/order';

export class TransactionController {
  /**
   * Create a new TransactionController instance.
   *
   * @return {mix}
   */
  constructor() {
    autoBind(this);
  }

  async showTransactionList(request, response, next) {
    try {
      const page = request.query.page || 1;
      const limit = 20;
      const offset = (page * limit) - limit;

      const findAllPromise = models.order.findAll({
        where: { storeId: request.session.store.id },
        include: [{
          model: models.orderItem,
        }],
        limit,
        offset,
        order: [
          ['createdAt', 'DESC'],
        ],
      });

      const findAndCountPromise = models.order.findAndCount();

      const [orders, count] = await Promise.all([findAllPromise, findAndCountPromise]);

      const data = {
        orders: mapForList(orders),
        pagination: paginateMeta({
          limit,
          page: parseInt(page, 10),
          total: count.count,
        }),
      };

      response.render('backstore/transaction/list', data);
    } catch (error) {
      next(error);
    }
  }

  showTransactionDetail(request, response, next) {
    const orderId = request.params.id;

    models.order.findById(orderId, {
      include: [models.orderItem],
    })
      .then((order) => {
        const transactionNotFound = !order;

        if (transactionNotFound) {
          return next(new NotFoundError('Transaksi yang dicari tidak ditemukan'));
        }

        if (request.session.store.id !== order.storeId) {
          return next(new NotFoundError('Transaksi yang dicari tidak ditemukan'));
        }

        const transaction = order.dataValues;
        const items = order.dataValues.orderItems;

        transaction.amount = orderItemsAmount(items);
        transaction.date = format(transaction.createdAt, 'dddd, DD MMM YYYY');

        const data = { transaction, items };

        return response.render('backstore/transaction/detail', data);
      })
      .catch((error) => {
        next(error);
      });
  }
}

export default new TransactionController();
