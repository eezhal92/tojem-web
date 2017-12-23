import { NotFoundError } from 'app/lib/errors';

/**
 * Handling if route not found.
 *
 * @param  {express.Request}  request
 * @param  {express.Response} response
 * @param  {function}         next
 * @return {mix}
 */
function notFound(request, response, next) {
  const error = new NotFoundError();

  return next(error);
}

export default notFound;
