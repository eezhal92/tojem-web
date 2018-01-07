import ExtendableError from 'es6-error';
import { AuthorizationError } from 'app/lib/errors';

export const ORDER_CHANNEL_OFFLINE = 'offline';
export const ORDER_TYPE_ON_SITE = 'on_site';
export const ORDER_TYPE_COD = 'cod';

const isValidOrderType = (type) => {
  const whiteList = [ORDER_TYPE_ON_SITE, ORDER_TYPE_COD];

  return whiteList.indexOf(type) !== -1;
};

export class InvalidOrderTypeError extends ExtendableError {}

export function validateOrder(type, request) {
  if (!request.user) {
    throw new AuthorizationError();
  }

  if (!isValidOrderType(type)) {
    throw new InvalidOrderTypeError(`Type of '${type}' is not valid type`);
  }

  return true;
}


export function mapForReport(orders) {
  return orders.map((o) => {
    const order = o.dataValues;

    if (order.orderItems) {
      order.amount = order.orderItems
        .map(orderItem => orderItem.productPrice * orderItem.qty)
        .reduce((acc, price) => acc + price, 0);
    }

    return order;
  });
}

export function summaryForSales(orders) {
  const mappedOrders = mapForReport(orders);

  return mappedOrders.map(({
    type,
    channel,
    amount,
    orderItems,
    createdAt,
  }) => ({
    type,
    channel,
    amount,
    itemsCount: orderItems.reduce((total, item) => total + (1 * item.qty), 0),
    date: createdAt,
  }));
}
