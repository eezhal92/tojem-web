import BaseProvider from 'tojem/providers/base-provider';
import { UnprocessableEntityError } from 'app/lib/errors';

import formBuilder from './form-builder';
import authentication from './authentication';

class LocalProvider extends BaseProvider {
  handle() {
    this.assignLocalDefault();
    this.assignLocalByMiddleware();
    this.assignFormErrorMiddleware();
  }

  set(key, value) {
    this.app.locals[key] = value;
  }

  assignLocalDefault() {
    this.set('app', this.config.get('app'));
  }

  assignLocalByMiddleware() {
    const locals = Object.assign(formBuilder || {}, {
      auth: authentication,
    });

    Object.keys(locals).forEach((key) => {
      this.app.use((request, response, next) => {
        const share = locals[key];

        this.set(key, typeof share === 'function' ? share(request) : share);

        next();
      });
    });
  }

  assignFormErrorMiddleware() {
    this.app.use((request, response, next) => {
      const formInputError = new UnprocessableEntityError(
        request.flash('errors')[0],
        request.flash('oldInputs')[0],
      );

      this.set('error', formInputError);

      next();
    });
  }
}

export default LocalProvider;
