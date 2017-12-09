module.exports = {
  url: `${process.env.TEST_BASE_URL}/login`,

  elements: {
    fbLoginLink: { selector: '.fb-login-link' },
    fbEmail: { selector: 'input#email' },
    fbPassword: { selector: 'input#pass' },
    fbLoginButton: { selector: '#loginbutton' },

    storeName: { selector: 'input[name=name]' },
    storeLocation: { selector: 'input[name=location]' },
    storeAddress: { selector: 'textarea[name=address]' },
    submitStore: { selector: '#submit' },
  },

  commands: [
    {
      fbLogin() {
        return this.setValue('@fbEmail', process.env.TEST_FACEBOOK_EMAIL)
          .setValue('@fbPassword', process.env.TEST_FACEBOOK_PASSWORD)
          .click('@fbLoginButton');
      },
    },

    {
      submitStoreInformation() {
        return this.waitForElementVisible('body', 1000)
          .assert.containsText('body', 'Silakan isi informasi toko Anda')
          .setValue('@storeName', 'Warung Mantap')
          .setValue('@storeLocation', 'Palu')
          .setValue('@storeAddress', 'Jl. Kancil')
          .click('@submitStore');
      },
    },
  ],
};
