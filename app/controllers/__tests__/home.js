import { HomeController } from '../home';

describe('app/controllers/home', () => {
  const request = { user: {} };
  const response = {
    render: jest.fn(),
    redirect: jest.fn(),
  };

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should call render to show home page', () => {
    const home = new HomeController();

    home.showHomePage(request, response);

    expect(response.render).toBeCalledWith('tojem/homepage', { user: {} });
    expect(response.render).toHaveBeenCalledTimes(1);
  });
});
