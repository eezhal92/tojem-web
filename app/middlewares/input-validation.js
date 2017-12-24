import { UnprocessableEntityError } from 'app/lib/errors';

/**
 * Handling input request body.
 *
 * @param  {function<Tojem.Constraint>} validationFactory
 * @return {function}
 */
function inputValidation(validationFactory) {
  return (req, res, next) => {
    const validation = validationFactory(req.body);

    if (validation.fails()) {
      return next(new UnprocessableEntityError(validation.errors.all()));
    }

    return next();
  };
}

export default inputValidation;
