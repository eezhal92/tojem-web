import { NotFoundError, UnprocessableEntityError } from 'app/lib/errors';

import serverError from '../server-error';

describe('middlewares/server-error', () => {
  const request = {
    flash: jest.fn(),
  };
  const response = {
    render: jest.fn(),
    status: jest.fn(),
    json: jest.fn(),
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
    console.log = jest.fn(); // eslint-disable-line no-console

    const error = new Error('Something went wrong');

    serverError(error, request, response, next);

    expect(console.log).toHaveBeenCalledTimes(1); // eslint-disable-line no-console
    expect(response.render).toBeCalledWith('error/500');
    expect(response.render).toHaveBeenCalledTimes(1);
    expect(next).not.toBeCalled();

    process.env.NODE_ENV = 'test';
  });

  it('should return json payload when handling UnprocessableEntityError and request is ajax', () => {
    request.xhr = true;
    response.status.mockImplementation(() => response);

    const constraintErrors = {
      name: ['should at least 6 character'],
    };

    const error = new UnprocessableEntityError(constraintErrors);

    serverError(error, request, response, next);

    expect(response.status).toBeCalledWith(422);
    expect(response.json).toBeCalledWith({ errors: constraintErrors });
    expect(next).not.toBeCalled();

    delete request.xhr;
  });

  it('should flash errorConstraints and oldInputs handling UnprocessableEntityError and request is not ajax', () => {
    request.xhr = false;

    const constraintErrors = {
      name: ['should at least 5 character'],
    };
    const error = new UnprocessableEntityError(constraintErrors);
    const requestPayload = {
      name: 'Baks',
    };
    request.body = requestPayload;

    serverError(error, request, response, next);

    expect(request.flash).toHaveBeenCalledTimes(2);
    expect(request.flash).toBeCalledWith('errors', constraintErrors);
    expect(request.flash).toBeCalledWith('oldInputs', requestPayload);
    expect(response.status).not.toBeCalled();
    expect(response.json).not.toBeCalled();
    expect(next).not.toBeCalled();

    delete request.xhr;
  });

  it('should throw error when is not production mode', () => {
    const error = new Error('Something went wrong');

    const tryToHandleErrorRequest = () => serverError(error, request, response, next);

    expect(tryToHandleErrorRequest).toThrowError('Something went wrong');
    expect(response.render).not.toBeCalled();
    expect(next).not.toBeCalled();
  });
});
