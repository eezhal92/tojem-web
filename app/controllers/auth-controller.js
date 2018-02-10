import autoBind from 'auto-bind';
import auth from 'app/lib/auth';

export class AuthController {
  /**
   * Create a new AuthController instance.
   *
   * @return {mix}
   */
  constructor() {
    autoBind(this);
  }

  /**
   * Show login form.
   *
   * @param  {Express.Request}  request
   * @param  {Express.Response} response
   * @param  {function}         next
   * @return {Express.Response}
   */
  getLoginForm(request, response) {
    response.render('auth/login');
  }

  /**
   * Redirect if user authenticated.
   *
   * @param  {Express.Request}  request
   * @param  {Express.Response} response
   * @param  {function}         next
   * @return {Express.Response}
   */
  redirectOnAuthenticated(request, response) {
    response.redirect('/backstore/products');
  }

  /**
   * Log user out.
   *
   * @param  {Express.Request}   request
   * @param  {Express.Response}  response
   * @param  {function}          next
   * @return {Express.Response}
   */
  logout(request, response, next) {
    request.session.destroy((error) => {
      if (error) {
        return next(error);
      }

      auth.destroy();

      return response.redirect('/');
    });
  }
}

export default new AuthController();
