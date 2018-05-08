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
      .assertAllErrorElementsNotPresent()
      .assert.elementNotPresent('@notificationElement')
      .setValue('@productBasePriceField', 50000)
      .setValue('@productProfitField', 5000)
      .setValue('@productDescriptionField', 'A very special pizza')
      .click('@saveProductButton')
      .assert.containsText('body', 'Tambah Produk')
      .assert.elementPresent('@errorProductName')
      .assert.elementNotPresent('@errorProductBasePrice')
      .assert.elementNotPresent('@errorProductProfit')
      .assert.elementNotPresent('@errorProductDescription')
      .assert.elementNotPresent('@notificationElement');
  });

  it('should fail when base price field is missing', (client) => {
    client.setCookie({
      'connect.sid': cookie,
    });

    const createProduct = client.page['create-product']();

    createProduct.navigate()
      .assertAllErrorElementsNotPresent()
      .assert.elementNotPresent('@notificationElement')
      .setValue('@productNameField', 'Bakso')
      .setValue('@productProfitField', 2000)
      .setValue('@productDescriptionField', 'A very special pizza')
      .click('@saveProductButton')
      .assert.elementNotPresent('@errorProductName')
      .assert.containsText('body', 'Tambah Produk')
      .assert.elementPresent('@errorProductBasePrice')
      .assert.elementNotPresent('@errorProductProfit')
      .assert.elementNotPresent('@errorProductDescription')
      .assert.elementNotPresent('@notificationElement');
  });

  it('should fail when profit field is missing', (client) => {
    client.setCookie({
      'connect.sid': cookie,
    });

    const createProduct = client.page['create-product']();

    createProduct.navigate()
      .assertAllErrorElementsNotPresent()
      .assert.elementNotPresent('@notificationElement')
      .setValue('@productNameField', 'Biji kopi hitam')
      .setValue('@productBasePriceField', 50000)
      .setValue('@productDescriptionField', 'Biji kopi asli')
      .click('@saveProductButton')
      .assert.elementNotPresent('@errorProductName')
      .assert.containsText('body', 'Tambah Produk')
      .assert.elementNotPresent('@errorProductBasePrice')
      .assert.elementPresent('@errorProductProfit')
      .assert.elementNotPresent('@errorProductDescription')
      .assert.elementNotPresent('@notificationElement');
  });

  it('should able to create a product', (client) => {
    client.setCookie({
      'connect.sid': cookie,
    });

    const createProduct = client.page['create-product']();

    createProduct.navigate()
      .assertAllErrorElementsNotPresent()
      .assert.elementNotPresent('@notificationElement')
      .setValue('@productNameField', 'Pizza')
      .setValue('@productBasePriceField', 80000)
      .setValue('@productProfitField', 25000)
      .setValue('@productDescriptionField', 'A very special pizza')
      .click('@saveProductButton')
      // TODO: Fixme
      // .assert.elementPresent('@notificationElement')
      .assertAllErrorElementsNotPresent();
  });

  it('should able to create a product without optional description field', (client) => {
    client.setCookie({
      'connect.sid': cookie,
    });

    const createProduct = client.page['create-product']();

    createProduct.navigate()
      .assertAllErrorElementsNotPresent()
      .assert.elementNotPresent('@notificationElement')
      .setValue('@productNameField', 'Burger')
      .setValue('@productBasePriceField', 50000)
      .setValue('@productProfitField', 15000)
      .click('@saveProductButton')
      // TODO: Fixme
      // .assert.elementPresent('@notificationElement')
      .assertAllErrorElementsNotPresent();
  });
});
