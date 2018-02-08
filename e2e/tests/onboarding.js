describe('Seller-user onboarding', () => {
  after((client, done) => {
    client.end(() => {
      done();
    });
  });

  let cookie;

  it('should be prompted to fill store information', (client) => {
    const login = client.page.login();

    login.navigate()
      .waitForElementVisible('body', 1000)
      .click('@fbLoginLink')
      .waitForElementVisible('body', 1000)
      .fbLogin();

    // eslint-disable-next-line prefer-arrow-callback
    client.getCookie('connect.sid', function cb(result) {
      cookie = result.value;
    });
  });

  it('#1 - fail by giving empty field', (client) => {
    client.setCookie({
      'connect.sid': cookie,
    });

    const createStore = client.page['create-store']();

    createStore.navigate()
      .waitForElementVisible('body', 1000)
      .submitEmptyField()
      .waitForElementVisible('body', 1000)
      .assert.containsText('body', 'Silakan isi informasi toko Anda');
  });

  it('#2 - fail by giving only one field', (client) => {
    client.setCookie({
      'connect.sid': cookie,
    });

    const createStore = client.page['create-store']();

    createStore.navigate()
      .waitForElementVisible('body', 1000)
      .setValue('@storeNameField', 'Warung Mantap')
      .click('@submitStoreButton')
      .waitForElementVisible('body', 1000)
      .assert.containsText('body', 'Silakan isi informasi toko Anda');

    createStore.navigate()
      .waitForElementVisible('body', 1000)
      .setValue('@storeLocationField', 'Palu')
      .click('@submitStoreButton')
      .waitForElementVisible('body', 1000)
      .assert.containsText('body', 'Silakan isi informasi toko Anda');

    createStore.navigate()
      .waitForElementVisible('body', 1000)
      .setValue('@storeAddressField', 'Jl. Kancil')
      .click('@submitStoreButton')
      .waitForElementVisible('body', 1000)
      .assert.containsText('body', 'Silakan isi informasi toko Anda');
  });

  it('#3 - fail missing one field', (client) => {
    client.setCookie({
      'connect.sid': cookie,
    });

    const createStore = client.page['create-store']();

    createStore.navigate()
      .waitForElementVisible('body', 1000)
      .setValue('@storeNameField', 'Warung Ijo')
      .setValue('@storeLocationField', 'Palu')
      .setValue('@storeAddressField', '')
      .click('@submitStoreButton')
      .waitForElementVisible('body', 1000)
      .assert.containsText('body', 'Silakan isi informasi toko Anda');

    createStore.navigate()
      .waitForElementVisible('body', 1000)
      .setValue('@storeNameField', 'Warung Ijo')
      .setValue('@storeLocationField', '')
      .setValue('@storeAddressField', 'Jl. Kancil')
      .click('@submitStoreButton')
      .waitForElementVisible('body', 1000)
      .assert.containsText('body', 'Silakan isi informasi toko Anda');

    createStore.navigate()
      .waitForElementVisible('body', 1000)
      .setValue('@storeNameField', '')
      .setValue('@storeLocationField', 'Palu')
      .setValue('@storeAddressField', 'Jl. Kancil')
      .click('@submitStoreButton')
      .waitForElementVisible('body', 1000)
      .assert.containsText('body', 'Silakan isi informasi toko Anda');
  });

  it('success - by giving valid input', (client) => {
    client.setCookie({
      'connect.sid': cookie,
    });

    const createStore = client.page['create-store']();

    createStore.navigate()
      .waitForElementVisible('body', 1000)
      .submitStoreInformation()
      .waitForElementVisible('body', 1000)
      .assert.containsText('body', 'Daftar Produk');
  });
});
