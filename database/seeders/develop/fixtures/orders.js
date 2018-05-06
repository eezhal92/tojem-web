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
let lastDay = dateFns.subYears(new Date(), 1);

// eslint-disable-next-line no-plusplus
for (let i = 0; i < 365; i++) {
  const day = dateFns.addDays(lastDay, 1);
  lastDay = day;

  const random = _.random(2, 5);

  // eslint-disable-next-line no-plusplus
  for (let j = 0; j < random; j++) {
    lastId += 1;

    const randomType = _.shuffle(types)[0];

    orderIds.push(lastId);

    const orderDate = dateFns.setHours(day, j + 1);
    const date = dateFns.format(orderDate, 'YYYY-MM-DD HH:mm:ss');

    const o = createOrder({
      storeId: 1,
      type: randomType,
      date,
      channel: randomType === 'cod' ? 'online' : 'offline',
    });

    orders = orders.concat(o);
  }
}

function createOrderItems({ orderId, date }) {
  const length = _.random(1, 3);

  return Array.from({ length }, (v, i) => {
    const product = products[i];

    return {
      orderId,
      productId: i + 1,
      productName: product.name,
      productPrice: product.basePrice + product.profit,
      qty: _.random(1, 2),
      createdAt: date,
      updatedAt: date,
    };
  });
}

let orderItems = [];
orderIds.forEach((id) => {
  const item = createOrderItems({
    orderId: id,
    date: orders[id - 1].createdAt,
  });

  orderItems = orderItems.concat(item);
});

module.exports = {
  orders,
  orderItems,
};
