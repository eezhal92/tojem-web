import serverError from '../server-error';
import { NotFoundError } from '../../lib/errors';

describe('middlewares/server-error', () => {
  const request = {};
  const response = {
    render: jest.fn(),
    redirect: jest.fn(),
  };
  const next = jest.fn();

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should redirect back when csrf token is invalid', () => {
    const error = new Error();
    error.code = 'EBADCSRFTOKEN';

    serverError(error, request, response, next);

    expect(response.redirect).toBeCalledWith('back');
    expect(response.redirect).toHaveBeenCalledTimes(1);
    expect(next).not.toBeCalled();
  });

  it('should render 404 page when error is NotFoundError instance', () => {
    const error = new NotFoundError('It is not found');

    serverError(error, request, response, next);

    expect(response.render).toBeCalledWith('error/404', { message: 'It is not found' });
    expect(response.render).toHaveBeenCalledTimes(1);
    expect(next).not.toBeCalled();
  });

  it('should render 500 page when production mode', () => {
    process.env.NODE_ENV = 'production';

    const error = new Error('Something went wrong');

    serverError(error, request, response, next);

    expect(response.render).toBeCalledWith('error/500');
    expect(response.render).toHaveBeenCalledTimes(1);
    expect(next).not.toBeCalled();

    process.env.NODE_ENV = 'test';
  });

  it('should throw error when is not production mode', () => {
    const error = new Error('Something went wrong');

    const tryToHandleErrorRequest = () => serverError(error, request, response, next);

    expect(tryToHandleErrorRequest).toThrowError('Something went wrong');
    expect(response.render).not.toBeCalled();
    expect(next).not.toBeCalled();
  });
});
