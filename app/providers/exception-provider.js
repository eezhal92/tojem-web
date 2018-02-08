import notFound from 'app/middlewares/not-found';
import serverError from 'app/middlewares/server-error';
import BaseProvider from 'tojem/providers/base-provider';

class ExceptionProvider extends BaseProvider {
  handle() {
    this.app.use(notFound);
    this.app.use(serverError);
  }
}

export default ExceptionProvider;
