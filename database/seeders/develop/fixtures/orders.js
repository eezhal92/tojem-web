const _ = require('lodash');
const dateFns = require('date-fns');
const products = require('./products');

const types = ['on_site', 'cod'];

function createOrder({
  date,
  storeId,
  channel = 'offline',
  type,
}) {
  return {
    storeId,
    channel,
    type,
    createdAt: date,
    updatedAt: date,
  };
}

const orderIds = [];
let orders = [];
let lastId = 0;

const now = new Date();
const lastYear = dateFns.subMonths(dateFns.subYears(now, 1), 1);

for (let i = 0; i < 12; i++) { // eslint-disable-line no-plusplus
  const month = dateFns.addMonths(lastYear, i + 1);

  for (let j = 0; j < 5; j++) { // eslint-disable-line no-plusplus
    lastId += 1;

    const randomType = _.shuffle(types)[0];

    orderIds.push(lastId);

    const orderDate = dateFns.setHours(month, j + 1);
    const date = dateFns.format(orderDate, 'YYYY-MM-DD HH:mm:ss');

    const o = createOrder({
      storeId: 1,
      type: randomType,
      date,
    });

    orders = orders.concat(o);
  }
}

function createOrderItems({
  orderId,
  date,
}) {
  const length = _.random(1, 3);

  return Array.from({ length }, (v, i) => {
    const product = products[i];

    return {
      orderId,
      productId: i + 1,
      productName: product.name,
      productPrice: product.price,
      qty: _.random(1, 2),
      createdAt: date,
      updatedAt: date,
    };
  });
}

let orderItems = [];
orderIds.forEach((id) => {
  orderItems = orderItems.concat(createOrderItems({
    orderId: id,
    date: orders[id - 1].createdAt,
  }));
});

module.exports = {
  orders,
  orderItems,
};
