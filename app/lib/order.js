import { uniq, flatten, uniqueId } from 'lodash';
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

function getDates(startDate, stopDate) {
  const dateArray = [];
  let currentDate = startDate;

  while (currentDate <= stopDate) {
    const pushedDate = new Date(dateFns.startOfDay(currentDate));
    dateArray.push(pushedDate.toISOString());
    currentDate = dateFns.format(dateFns.addDays(currentDate, 1), 'YYYY-MM-DD');
  }

  return dateArray;
}

export function summaryForSales({
  startDate,
  endDate,
  orders,
} = {}) {
  const mappedOrders = mapForReport(orders).map(({
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

  const start = startDate.slice(0, 10);
  const end = endDate.slice(0, 10);
  const dates = getDates(start, end);

  // If the date is same
  // we don't need to generate no transaction data
  if (start === end) {
    return mappedOrders;
  }

  // Generate data for date that transaction not exists
  const orderDates = uniq(mappedOrders.map(order => dateFns.startOfDay(order.date).toISOString()));

  const result = dates.map((date) => {
    const isOrderExists = orderDates.indexOf(date) !== -1;

    if (isOrderExists) {
      return mappedOrders.filter(order => dateFns.isSameDay(date, order.date));
    }

    return {
      id: uniqueId('no_transaction_'),
      amount: 0,
      profit: 0,
      date,
      itemsCount: 0,
    };
  });

  return flatten(result);
}
