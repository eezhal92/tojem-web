// eslint-disable-next-line no-unused-vars
export default function serverError(error, request, response, next) {
  if (process.env.NODE_ENV === 'production') {
    response.send(`Oops ${error}`);

    return;
  }

  throw error;
}
