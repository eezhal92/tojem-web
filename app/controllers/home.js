export default function home(request, response) {
  const data = { user: request.user };

  response.render('tojem/homepage', data);
}
