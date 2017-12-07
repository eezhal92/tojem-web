import path from 'path';
import express from 'express';
import passport from 'passport';
import bodyParser from 'body-parser';
import session from 'express-session';
import cookieParser from 'cookie-parser';

import serverError from './server-error';

/**
 * @type function[]
 */
const middlewares = [
  express.static(path.resolve(__dirname, '../..', 'public')),
  cookieParser(),
  bodyParser.urlencoded({ extended: true }),
  session({ secret: 'keyboard cat', resave: true, saveUninitialized: true }),
  passport.initialize(),
  passport.session(),
  serverError,
];

export default middlewares;
