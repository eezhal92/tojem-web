/* eslint-env node, mocha */

require('dotenv').config();

describe('Create product', () => {
  let cookie;

  before((client, done) => {
    const login = client.page.login();

    login.navigate()
      .waitForElementVisible('body', 1000)
      .click('@fbLoginLink')
      .waitForElementVisible('body', 1000)
      .fbLogin();

    // eslint-disable-next-line prefer-arrow-callback
    client.getCookie('connect.sid', function cb(result) {
      cookie = result.value;
      done();
    });
  });

  after((client, done) => {
    client.end(() => {
      done();
    });
  });

  it('should fail when name field is missing', (client) => {
    client.setCookie({
      'connect.sid': cookie,
    });

    const createProduct = client.page['create-product']();

    createProduct.navigate()
      .setValue('@productPriceField', 40)
      .setValue('@productDescriptionField', 'A very special pizza')
      .click('@saveProductButton')
      .waitForElementVisible('body', 1000)
      .assert.containsText('body', 'Buat Produk')
      .assert.elementNotPresent('@productName')
      .assert.elementNotPresent('@productPrice');
  });

  it('should fail when price field is missing', (client) => {
    client.setCookie({
      'connect.sid': cookie,
    });

    const createProduct = client.page['create-product']();

    createProduct.navigate()
      .setValue('@productNameField', 'Bakso')
      .setValue('@productDescriptionField', 'A very special pizza')
      .click('@saveProductButton')
      .waitForElementVisible('body', 1000)
      .assert.containsText('body', 'Buat Produk')
      .assert.elementNotPresent('@productName')
      .assert.elementNotPresent('@productPrice')
      .assert.elementNotPresent('@productDescription');
  });

  it('should able to create a product', (client) => {
    client.setCookie({
      'connect.sid': cookie,
    });

    const createProduct = client.page['create-product']();

    createProduct.navigate()
      .setValue('@productNameField', 'Pizza')
      .setValue('@productPriceField', 40)
      .setValue('@productDescriptionField', 'A very special pizza')
      .click('@saveProductButton')
      .waitForElementVisible('body', 1000)
      .assert.containsText('@productName', 'Pizza')
      .assert.containsText('@productPrice', 'Rp. 40')
      .assert.containsText('@productDescription', 'A very special pizza');
  });

  it('should able to create a product without optional description field', (client) => {
    client.setCookie({
      'connect.sid': cookie,
    });

    const createProduct = client.page['create-product']();

    createProduct.navigate()
      .setValue('@productNameField', 'Burger')
      .setValue('@productPriceField', 50)
      .click('@saveProductButton')
      .waitForElementVisible('body', 1000)
      .assert.containsText('@productName', 'Burger')
      .assert.containsText('@productPrice', 'Rp. 50')
      .assert.containsText('@productDescription', '');
  });
});
