import csrf from 'csurf';
import webRouter from 'app/routes/index';
import apiRouter from 'app/routes/api';
import BaseProvider from 'tojem/providers/base-provider';

class RouteProvider extends BaseProvider {
  handle() {
    this.mapWebRouter();
    this.mapApiRouter();
  }

  mapWebRouter() {
    this.app.use(csrf({ cookie: true }), webRouter);
  }

  mapApiRouter() {
    this.app.use(apiRouter);
  }
}

export default RouteProvider;
