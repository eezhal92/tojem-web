/* eslint-env node, mocha */

require('dotenv').config();

describe('Create product', () => {
  after((client, done) => {
    client.end(() => {
      done();
    });
  });

  it('should able to create a product', (client) => {
    const login = client.page.login();

    login.navigate()
      .waitForElementVisible('body', 1000)
      .click('@fbLoginLink')
      .waitForElementVisible('body', 1000)
      .fbLogin()
      .waitForElementVisible('body', 1000)
      .click('.btn-add-product')
      .waitForElementVisible('body', 1000)
      .assert.containsText('body', 'Buat Produk');

    const createProduct = client.page['create-product']();

    createProduct.navigate()
      .setValue('@productNameField', 'Pizza')
      .setValue('@productPriceField', 40)
      .setValue('@productDescriptionField', 'A very special pizza')
      .click('@saveProductButton')
      .waitForElementVisible('body', 1000)
      .assert.containsText('@productName', 'Pizza')
      .assert.containsText('@productPrice', 'Rp. 40');
  });
});
