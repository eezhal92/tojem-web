import { UnprocessableEntityError } from '../lib/errors';

export default function inputValidation(validationFactory) {
  return (req, res, next) => {
    const validation = validationFactory(req.body);

    if (validation.fails()) {
      return next(new UnprocessableEntityError(validation.errors.all()));
    }

    return next();
  };
}
