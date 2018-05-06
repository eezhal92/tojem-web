module.exports = {
  url: `${process.env.TEST_BASE_URL}/backstore/products/create`,
  elements: {
    productNameField: { selector: 'input[name=name]' },
    productBasePriceField: { selector: 'input[name=basePrice]' },
    productProfitField: { selector: 'input[name=profit]' },
    productDescriptionField: { selector: 'textarea[name=description]' },
    saveProductButton: { selector: '#save-product-button' },
    errorProductName: { selector: '[data-error="product-name"]' },
    errorProductBasePrice: { selector: '[data-error="product-base-price"]' },
    errorProductProfit: { selector: '[data-error="product-profit"]' },
    errorProductDescription: { selector: '[data-error="product-description"]' },
  },
};
