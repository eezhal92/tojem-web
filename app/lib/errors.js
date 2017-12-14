import ExtendableError from 'es6-error';

export default class HttpError extends ExtendableError {}

export class NotFoundError extends HttpError {
  constructor(message = 'Halaman kagak ditemukan') {
    super(message);
    this.code = 404;
  }
}

export class AuthorizationError extends HttpError {
  constructor(message = 'Anda tidak ter-otentikasi') {
    super(message);
    this.code = 401;
  }
}

export class UnprocessableEntityError extends HttpError {
  constructor(constraintErrors) {
    super('Cannot process your request');
    this.code = 422;
    this.constraintErrors = constraintErrors;
  }
}
