/* eslint class-methods-use-this: [2, { exceptMethods: [createStoreForm] }] */

import autoBind from 'auto-bind';
import onBoardingService from 'app/services/onboarding';

export class OnBoardingController {
  /**
   * Create a new OnBoardingController instance.
   *
   * @param  {Tojem.Service.OnBoardingService} onboardingService
   * @return {mix}
   */
  constructor(onboardingService) {
    this.onBoardingService = onboardingService;

    autoBind(this);
  }

  /**
   *
   * @param  {Express.Request}  request
   * @param  {Express.Response} response
   * @return {Express.Response}
   */
  createStoreForm(request, response) {
    const data = { user: request.user, csrfToken: request.csrfToken() };

    response.render('onboarding/create-store', data);
  }

  /**
   * Menyimpan record store baru ke database.
   *
   * @param  {Express.Request}  request
   * @param  {Express.Response} response
   * @param  {function}         next
   * @return {Express.Response}
   */
  createStore(request, response, next) {
    const data = {
      ownerId: request.user.id,
      name: request.body.name,
      location: request.body.location,
      address: request.body.address,
    };

    this.onBoardingService.create(data)
      .then((store) => {
        // @todo maybe it should be extracted into a dedicated function. it's duplicated
        // @see app/middlewares/store.js
        request.session.store = store.dataValues;

        response.redirect('/backstore/products');
      })
      .catch((error) => {
        next(error);
      });
  }
}

export default new OnBoardingController(onBoardingService);
