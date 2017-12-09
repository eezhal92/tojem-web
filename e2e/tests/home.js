/* eslint-env node, mocha */

describe('Home page', () => {
  describe('non-user visit home page', () => {
    after((client, done) => {
      client.end(() => {
        done();
      });
    });

    it('should render correctly', (client) => {
      const home = client.page.home();

      home.navigate()
        .waitForElementVisible('body', 1000)
        .assert.containsText('body', 'jualan jadi mudah');
    });

    it('can navigate to login page', (client) => {
      const home = client.page.home();

      home.navigate()
        .waitForElementVisible('body', 1000)
        .assert.containsText('body', 'jualan jadi mudah');
    });
  });
});
