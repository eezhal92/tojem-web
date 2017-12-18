import { AuthController } from '../auth';

describe('app/controllers/auth', () => {
  const request = {};
  const response = {
    render: jest.fn(),
    redirect: jest.fn(),
  };

  let auth;

  beforeEach(() => {
    jest.resetAllMocks();
    auth = new AuthController();
  });

  it('should call render login form', () => {
    auth.getLoginForm(request, response);

    expect(response.render).toBeCalledWith('auth/login');
    expect(response.render).toHaveBeenCalledTimes(1);
    expect(response.redirect).not.toBeCalled();
  });

  it('should call redirect when user is authenticated', () => {
    auth.redirectOnAuthenticated(request, response);

    expect(response.redirect).toBeCalledWith('/backstore/products');
    expect(response.redirect).toHaveBeenCalledTimes(1);
    expect(response.render).not.toBeCalled();
  });
});
