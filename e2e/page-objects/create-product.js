module.exports = {
  url: `${process.env.TEST_BASE_URL}/backstore/products/create`,
  elements: {
    productNameField: { selector: 'input[name=name]' },
    productPriceField: { selector: 'input[name=price]' },
    productDescriptionField: { selector: 'textarea[name=description]' },
    saveProductButton: { selector: '#save-product-button' },
    productName: { selector: '.product-name' },
    productPrice: { selector: '.product-price' },
  },
};
