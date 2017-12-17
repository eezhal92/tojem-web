module.exports = {
  url: `${process.env.TEST_BASE_URL}/login`,

  elements: {
    fbLoginLink: { selector: '.fb-login-link' },
    fbEmailField: { selector: 'input#email' },
    fbPasswordField: { selector: 'input#pass' },
    fbLoginButton: { selector: '#loginbutton' },
  },

  commands: [
    {
      fbLogin() {
        return this.setValue('@fbEmailField', process.env.TEST_FACEBOOK_EMAIL)
          .setValue('@fbPasswordField', process.env.TEST_FACEBOOK_PASSWORD)
          .click('@fbLoginButton');
      },
    },
  ],
};
