/* eslint class-methods-use-this: [2, { exceptMethods: [
  getLoginForm, redirectOnAuthenticated
]}] */

import autoBind from 'auto-bind';

export class AuthController {
  /**
   * Create a new AuthController instance.
   *
   * @return {any}
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
}

export default new AuthController();
