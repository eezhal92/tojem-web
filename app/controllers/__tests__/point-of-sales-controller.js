import { PointOfSalesController } from '../point-of-sales-controller';

describe('app/controllers/point-of-sales-controller', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  const request = {};
  const response = {
    render: jest.fn(),
    redirect: jest.fn(),
  };

  it('should call .render view transaction form', () => {
    const pos = new PointOfSalesController();

    pos.showTransactionForm(request, response);

    expect(response.render).toBeCalledWith('backstore/point-of-sales/create');
    expect(response.render).toHaveBeenCalledTimes(1);
  });
});
