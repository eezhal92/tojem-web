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
      .setValue('@productBasePriceField', 50000)
      .setValue('@productProfitField', 5000)
      .setValue('@productDescriptionField', 'A very special pizza')
      .click('@saveProductButton')
      .waitForElementVisible('body', 1000)
      .assert.containsText('body', 'Tambah Produk')
      .assert.elementPresent('@errorProductName')
      .assert.elementNotPresent('@errorProductBasePrice')
      .assert.elementNotPresent('@errorProductProfit')
      .assert.elementNotPresent('@errorProductDescription');
  });

  it('should fail when base price field is missing', (client) => {
    client.setCookie({
      'connect.sid': cookie,
    });

    const createProduct = client.page['create-product']();

    createProduct.navigate()
      .setValue('@productNameField', 'Bakso')
      .setValue('@productProfitField', 2000)
      .setValue('@productDescriptionField', 'A very special pizza')
      .click('@saveProductButton')
      .waitForElementVisible('body', 1000)
      .assert.containsText('body', 'Tambah Produk')
      .assert.elementNotPresent('@errorProductName')
      .assert.elementPresent('@errorProductBasePrice')
      .assert.elementNotPresent('@errorProductProfit')
      .assert.elementNotPresent('@errorProductDescription');
  });

  it('should able to create a product', (client) => {
    client.setCookie({
      'connect.sid': cookie,
    });

    const createProduct = client.page['create-product']();

    createProduct.navigate()
      .setValue('@productNameField', 'Pizza')
      .setValue('@productBasePriceField', 80000)
      .setValue('@productProfitField', 25000)
      .setValue('@productDescriptionField', 'A very special pizza')
      .click('@saveProductButton')
      .waitForElementVisible('body', 1000)
      .assert.elementNotPresent('@errorProductName')
      .assert.elementNotPresent('@errorProductBasePrice')
      .assert.elementNotPresent('@errorProductProfit')
      .assert.elementNotPresent('@errorProductDescription');
  });

  it('should able to create a product without optional description field', (client) => {
    client.setCookie({
      'connect.sid': cookie,
    });

    const createProduct = client.page['create-product']();

    createProduct.navigate()
      .setValue('@productNameField', 'Burger')
      .setValue('@productBasePriceField', 50000)
      .setValue('@productProfitField', 15000)
      .click('@saveProductButton')
      .waitForElementVisible('body', 1000)
      .assert.elementNotPresent('@errorProductName')
      .assert.elementNotPresent('@errorProductBasePrice')
      .assert.elementNotPresent('@errorProductProfit')
      .assert.elementNotPresent('@errorProductDescription');
  });
});
