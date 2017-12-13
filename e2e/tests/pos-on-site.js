/* eslint-env node, mocha */
require('dotenv').config();

const path = require('path');
const { spawn } = require('child_process');

const BIN_SEQUELIZE = path.resolve(__dirname, '../../node_modules/.bin/sequelize');
const mysqlUrl = 'mysql://root:password@localhost:/tojem-test';

function seed() {
  return new Promise((resolve) => {
    spawn(BIN_SEQUELIZE, ['db:seed:all', '--url', mysqlUrl, '--seeders-path', 'database/seeders/e2e'])
      .on('close', () => {
        resolve();
      });
  });
}

describe('On-site Point of sales', () => {
  before((client, done) => {
    seed().then(() => {
      done();
    });
  });

  after((client, done) => {
    client.end(() => {
      done();
    });
  });

  let cookie;

  it('should able to go to pos page', (client) => {
    const login = client.page.login();

    login.navigate()
      .waitForElementVisible('body', 1000)
      .click('@fbLoginLink')
      .waitForElementVisible('body', 1000)
      .fbLogin()
      .waitForElementVisible('body', 1000)
      .assert.containsText('body', 'Nasi Goreng')
      .click('.btn-new-transaction')
      .waitForElementVisible('body', 1000)
      .assert.containsText('body', 'Transaksi');

    // eslint-disable-next-line prefer-arrow-callback
    client.getCookie('connect.sid', function cb(result) {
      cookie = result.value;
    });
  });

  it('cannot process without cart items', (client) => {
    client.setCookie({
      'connect.sid': cookie,
    });

    const pos = client.page.pos();

    pos.navigate()
      .waitForElementVisible('body', 1000)
      .assert.containsText('body', 'Belum ada barang')
      .assert.elementNotPresent('#error-message')
      .click('@payButton')
      .assert.elementPresent('#error-message')
      .assert.containsText('#error-message', 'Belum ada barang');
  });

  it('cannot process without cash being inputted', (client) => {
    client.setCookie({
      'connect.sid': cookie,
    });

    const pos = client.page.pos();

    pos.navigate()
      .waitForElementVisible('body', 1000)
      .assert.containsText('body', 'Belum ada barang')
      .assert.elementNotPresent('#error-message')
      .click('#add-product-item-1')
      .click('@payButton')
      .assert.elementPresent('#error-message')
      .assert.containsText('#error-message', 'Cash belum di-input');
  });

  it('cannot process when customer cash is not enough', (client) => {
    client.setCookie({
      'connect.sid': cookie,
    });

    const pos = client.page.pos();

    pos.navigate()
      .waitForElementVisible('body', 1000)
      .assert.containsText('body', 'Belum ada barang')
      .assert.elementNotPresent('#error-message')
      .click('#add-product-item-1')
      .setValue('@customerCashField', 10)
      .click('@payButton')
      .assert.elementPresent('#error-message')
      .assert.containsText('#error-message', 'Cash tidak cukup');
  });

  it('can process transaction', (client) => {
    client.setCookie({
      'connect.sid': cookie,
    });

    const pos = client.page.pos();

    pos.navigate()
      .waitForElementVisible('body', 1000)
      .assert.containsText('body', 'Belum ada barang')
      .assert.elementNotPresent('#error-message')
      .click('#add-product-item-1') // item price: 10,000
      .setValue('@customerCashField', 50000)
      .click('@payButton')
      .assert.elementNotPresent('#error-message')
      .assert.elementPresent('#success-message')
      .assert.containsText('#success-message', 'Transaksi berhasil')
      .assert.containsText('#customer-changes', 'Rp. 40,000')
      .assert.elementNotPresent('@payButton');
  });
});
