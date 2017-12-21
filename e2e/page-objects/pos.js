module.exports = {
  url: `${process.env.TEST_BASE_URL}/backstore/pos`,
  elements: {
    orderTypeSelectField: {
      selector: '#order-type',
    },
    payButton: {
      selector: '#pay-button',
    },
    customerCashField: {
      selector: '#customer-cash',
    },
  },
};
