import BaseProvider from 'tojem/providers/base-provider';

import formBuilder from './form-builder';
import authentication from './authentication';

class LocalProvider extends BaseProvider {
  handle() {
    this.assignLocalDefault();
    this.assignLocalByMiddleware();
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
}

export default LocalProvider;
