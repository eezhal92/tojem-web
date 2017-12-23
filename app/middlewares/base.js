import path from 'path';
import express from 'express';
import passport from 'passport';
import flash from 'connect-flash';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import expressSession from 'express-session';
import session from 'app/middlewares/session';

/**
 * Base middlewares.
 *
 * @type function[]
 */
const baseMiddlewares = [
  express.static(path.resolve(__dirname, '../..', 'public')),
  cookieParser(),
  bodyParser.urlencoded({ extended: true }),
  bodyParser.json(),
  expressSession(session(process.env.NODE_ENV)),
  flash(),
  passport.initialize(),
  passport.session(),
];

export default baseMiddlewares;
