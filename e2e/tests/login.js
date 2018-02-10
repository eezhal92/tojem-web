describe('Login page', () => {
  describe('non-user visit login page', () => {
    after((client, done) => {
      client.end(() => {
        done();
      });
    });

    it('can navigate from home', (client) => {
      const home = client.page.home();

      home.navigate()
        .waitForElementVisible('body', 1000)
        .click('@loginLink')
        .waitForElementVisible('body', 1000)
        .expect.element('body').text.to.contain('Masuk dengan facebook');
    });

    it('cannot visit login page, when already logged in', (client) => {
      const login = client.page.login();

      login.navigate()
        .waitForElementVisible('body', 1000)
        .click('@fbLoginLink')
        .waitForElementVisible('body', 1000)
        .fbLogin();

      client
        .url('http://localhost:3000/login')
        .waitForElementVisible('body', 1000)
        .url(function cb(result) {
          this.assert.equal(result.value, `${process.env.TEST_BASE_URL}/`);
        });
    });
  });
});
