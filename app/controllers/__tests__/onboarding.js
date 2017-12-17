import { OnBoardingController } from '../onboarding';

describe('app/controllers/onboarding', () => {
  const next = jest.fn();
  const request = {
    session: jest.fn(),
    user: jest.fn(),
    csrfToken: jest.fn(),
  };
  const response = {
    render: jest.fn(),
    redirect: jest.fn(),
  };

  const onbService = {
    create: jest.fn(n => Promise.resolve(n)),
  };

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should call `render` on create store form', () => {
    const onboarding = new OnBoardingController();

    onboarding.createStoreForm(request, response);

    expect(response.render).toBeCalledWith('onboarding/create-store', {
      user: request.user, csrfToken: request.csrfToken(),
    });
    expect(response.render).toHaveBeenCalledTimes(1);
  });

  it('should call `.redirect` after create store', async () => {
    request.user.id = 1;
    request.body = { name: 'loki', location: 'everest', address: 'himalaya' };
    const data = {
      ownerId: request.user.id,
      name: request.body.name,
      location: request.body.location,
      address: request.body.address,
    };

    onbService.create.mockImplementation(() => Promise.resolve(data));

    const onboarding = new OnBoardingController(onbService);

    await Promise.resolve()
      .then(onboarding.createStore(request, response, next));

    expect(onbService.create).toBeCalledWith(data);
    expect(onbService.create).toHaveBeenCalledTimes(1);

    expect(response.redirect).toBeCalledWith('/backstore/products');
    expect(response.redirect).toHaveBeenCalledTimes(1);
    expect(response.redirect).not.toHaveBeenCalledTimes(2);
    expect(next).not.toBeCalled();
  });

  it('should call `next` if service error', async () => {
    const error = new Error('Service Error');
    onbService.create.mockImplementation(() => Promise.reject(error));

    const onboarding = new OnBoardingController(onbService);

    await Promise.resolve()
      .then(onboarding.createStore(request, response, next));

    expect(response.redirect).not.toBeCalled();
    expect(next).toBeCalledWith(error);
    expect(next).toHaveBeenCalledTimes(1);
  });
});
