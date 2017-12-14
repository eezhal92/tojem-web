class PointOfSales {
  constructor() {
    this.showTransactionForm = this.showTransactionForm.bind(this);
    this.processTransaction = this.processTransaction.bind(this);
  }

  // eslint-disable-next-line
  showTransactionForm(request, response, next) {
    response.render('backstore/pos/create');
  }

  // eslint-disable-next-line
  processTransaction(request, response, next) {

  }
}

export default new PointOfSales();
