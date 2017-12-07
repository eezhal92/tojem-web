export default function notFound(request, response, next) {
  const error = new Error('Something went wrong');

  return next(error);
}
