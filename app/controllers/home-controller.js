/* eslint class-methods-use-this: [2, { exceptMethods: [showHomePage] }] */

import autoBind from 'auto-bind';

export class HomeController {
  /**
   * Create a new HomeController instance.
   *
   * @return {mix}
   */
  constructor() {
    autoBind(this);
  }

  /**
   * Show landing page.
   *
   * @param  {Express.Request}  request
   * @param  {Express.Response} response
   * @param  {function}         next
   * @return {Express.Response}
   */
  showHomePage(request, response, next) {
    const data = { user: request.user };

    response.render('tojem/homepage', data);
  }
}

export default new HomeController();
