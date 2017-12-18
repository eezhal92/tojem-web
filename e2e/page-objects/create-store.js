module.exports = {
  url: `${process.env.TEST_BASE_URL}/onboard/create-store`,

  elements: {
    storeNameField: { selector: 'input[name=name]' },
    storeLocationField: { selector: 'input[name=location]' },
    storeAddressField: { selector: 'textarea[name=address]' },
    submitStoreButton: { selector: '#submit' },
  },

  commands: [
    {
      submitEmptyField() {
        return this.setValue('@storeNameField', '')
          .setValue('@storeLocationField', '')
          .setValue('@storeAddressField', '')
          .click('@submitStoreButton');
      },
    },

    {
      submitStoreInformation() {
        return this.setValue('@storeNameField', 'Warung Mantap')
          .setValue('@storeLocationField', 'Palu')
          .setValue('@storeAddressField', 'Jl. Kancil')
          .click('@submitStoreButton');
      },
    },
  ],
};
