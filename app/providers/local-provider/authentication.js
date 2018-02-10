import auth from 'app/lib/auth';

export default (request) => {
  if (request.isAuthenticated()) {
    auth.set(request);
  }

  return auth;
};
