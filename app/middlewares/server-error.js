import { NotFoundError, UnprocessableEntityError } from '../lib/errors';

// eslint-disable-next-line no-unused-vars
export default function serverError(error, request, response, next) {
  if (error.code === 'EBADCSRFTOKEN') {
    return response.redirect('back');
  }

  if (error instanceof NotFoundError) {
    return response.render('error/404', { message: error.message });
  }

  if (error instanceof UnprocessableEntityError) {
    if (request.xhr) {
      return response.status(error.code).json({
        errors: error.constraintErrors,
      });
    }

    request.flash('errors', error.constraintErrors);
    request.flash('oldInputs', request.body);

    return response.redirect('back');
  }

  if (process.env.NODE_ENV === 'production') {
    return response.render('error/500');
  }

  throw error;
}
