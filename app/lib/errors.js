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
  constructor(constraintErrors = {}, oldInput = {}) {
    super('Cannot process your request');
    this.code = 422;
    this.constraintErrors = constraintErrors;
    this.oldInput = oldInput;
  }

  length() {
    return Object.keys(this.constraintErrors).length;
  }

  getOldInput(fieldName) {
    const value = this.oldInput[fieldName];

    if (!value) {
      return '';
    }

    return value;
  }

  getMessage(fieldName) {
    if (!this.length()) {
      return null;
    }

    const fieldErrors = this.constraintErrors[fieldName];

    if (!fieldErrors) {
      return null;
    }

    return fieldErrors.join(' ');
  }
}
