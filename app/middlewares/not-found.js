import { NotFoundError } from '../lib/errors';

export default function notFound(request, response, next) {
  const error = new NotFoundError();

  return next(error);
}
