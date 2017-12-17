import { PointOfSales } from '../pos';

describe('app/controllers/pos - point of sales', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  const next = jest.fn();
  const request = {};
  const response = {
    render: jest.fn(),
    redirect: jest.fn(),
  };

  it('should call .render view transaction form', () => {
    const pos = new PointOfSales();

    pos.showTransactionForm(request, response);

    expect(response.render).toBeCalledWith('backstore/pos/create');
    expect(response.render).toHaveBeenCalledTimes(1);
  });

  it.skip('pos.showTransactionForm', () => {
    const pos = new PointOfSales();

    pos.showTransactionForm(request, response, next);
  });
});
