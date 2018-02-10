import passport from 'passport';
import flash from 'connect-flash';
import bodyParser from 'body-parser';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import sessionStrategy from 'app/lib/session-strategy';
import BaseProvider from 'tojem/providers/base-provider';

class FoundationProvider extends BaseProvider {
  get defaultsMiddlewares() {
    return [
      cookieParser(),
      bodyParser.urlencoded({ extended: true }),
      bodyParser.json(),
      session(sessionStrategy(process.env.NODE_ENV)),
      flash(),
      passport.initialize(),
      passport.session(),
    ];
  }

  handle() {
    this.setupBaseMiddleware();
  }

  setupBaseMiddleware() {
    this.app.use(...this.defaultsMiddlewares);
  }
}

export default FoundationProvider;
