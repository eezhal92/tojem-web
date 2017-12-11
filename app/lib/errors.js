import ExtendableError from 'es6-error';

export default class HttpError extends ExtendableError {}

export class NotFoundError extends HttpError {
  constructor(message = 'Halaman kagak ditemukan') {
    super(message);
  }
}
