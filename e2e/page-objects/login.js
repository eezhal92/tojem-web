module.exports = {
  url: `${process.env.TEST_BASE_URL}/login`,

  elements: {
    fbLoginLink: { selector: '.fb-login-link' },
    fbEmailField: { selector: 'input#email' },
    fbPasswordField: { selector: 'input#pass' },
    fbLoginButton: { selector: '#loginbutton' },

    storeNameField: { selector: 'input[name=name]' },
    storeLocationField: { selector: 'input[name=location]' },
    storeAddressField: { selector: 'textarea[name=address]' },
    submitStoreButton: { selector: '#submit' },
  },

  commands: [
    {
      fbLogin() {
        return this.setValue('@fbEmailField', process.env.TEST_FACEBOOK_EMAIL)
          .setValue('@fbPasswordField', process.env.TEST_FACEBOOK_PASSWORD)
          .click('@fbLoginButton');
      },
    },

    {
      submitStoreInformation() {
        return this.waitForElementVisible('body', 1000)
          .assert.containsText('body', 'Silakan isi informasi toko Anda')
          .setValue('@storeNameField', 'Warung Mantap')
          .setValue('@storeLocationField', 'Palu')
          .setValue('@storeAddressField', 'Jl. Kancil')
          .click('@submitStoreButton');
      },
    },
  ],
};
