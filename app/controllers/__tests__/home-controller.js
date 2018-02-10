import { HomeController } from '../home-controller';

describe('app/controllers/home-controller', () => {
  const request = {};
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

    expect(response.render).toBeCalledWith('tojem/homepage');
    expect(response.render).toHaveBeenCalledTimes(1);
  });
});
