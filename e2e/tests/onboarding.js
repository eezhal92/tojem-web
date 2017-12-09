/* eslint-env node, mocha */

require('dotenv').config();

describe('Seller-user onboarding', () => {
  after((client, done) => {
    client.end(() => {
      done();
    });
  });

  it('should be prompted to fill store information', (client) => {
    const login = client.page.login();

    login.navigate()
      .waitForElementVisible('body', 1000)
      .click('@fbLoginLink')
      .waitForElementVisible('body', 1000)
      .fbLogin()
      .submitStoreInformation()
      .waitForElementVisible('body', 1000)
      .assert.containsText('body', 'Daftar Produk');
  });
});
