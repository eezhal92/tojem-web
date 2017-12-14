import { NotFoundError, UnprocessableEntityError } from '../lib/errors';

// eslint-disable-next-line no-unused-vars
export default function serverError(error, request, response, next) {
  if (error.code === 'EBADCSRFTOKEN') {
    response.redirect('back');

    return;
  }

  if (error instanceof NotFoundError) {
    response.render('error/404', { message: error.message });

    return;
  }

  if (error instanceof UnprocessableEntityError) {
    if (request.xhr) {
      response.status(error.code).json({
        errors: error.constraintErrors,
      });
    } else {
      response.redirect('back');
    }

    return;
  }

  if (process.env.NODE_ENV === 'production') {
    response.render('error/500');

    return;
  }

  throw error;
}
