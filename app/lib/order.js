import dateFns from 'date-fns';
import ExtendableError from 'es6-error';
import { AuthorizationError } from 'app/lib/errors';

export const ORDER_CHANNEL_OFFLINE = 'offline';
export const ORDER_CHANNEL_ONLINE = 'online';
export const ORDER_TYPE_ON_SITE = 'on_site';
export const ORDER_TYPE_COD = 'cod';

const typeText = (type) => {
  const texts = {
    [ORDER_TYPE_COD]: 'Cash on Delivery',
    [ORDER_TYPE_ON_SITE]: 'Di tempat',
  };

  return texts[type];
};

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

export const orderItemsAmount = orderItems => orderItems
  .map(item => item.productPrice * item.qty)
  .reduce((acc, price) => acc + price, 0);

export const orderItemsProfit = orderItems => orderItems
  .map(item => item.productProfit * item.qty)
  .reduce((acc, profit) => acc + profit, 0);

export function mapForReport(orders) {
  return orders.map((o) => {
    const order = o.dataValues;

    if (order.orderItems) {
      order.amount = orderItemsAmount(order.orderItems);
      order.profit = orderItemsProfit(order.orderItems);
    }

    return order;
  });
}

export function mapForList(orders) {
  return orders.map((o) => {
    const order = o.dataValues;

    if (order.orderItems) {
      order.amount = orderItemsAmount(order.orderItems);
      order.profit = orderItemsProfit(order.orderItems);
      order.type = typeText(order.type);
      order.date = dateFns.format(order.createdAt, 'dddd, DD MMM YYYY @ HH:mm');
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
    profit,
  }) => ({
    type,
    channel,
    amount,
    profit,
    itemsCount: orderItems.reduce((total, item) => total + (1 * item.qty), 0),
    date: createdAt,
  }));
}
