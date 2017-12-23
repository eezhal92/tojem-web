import path from 'path';
import express from 'express';
import passport from 'passport';
import flash from 'connect-flash';
import bodyParser from 'body-parser';
import session from 'express-session';
import cookieParser from 'cookie-parser';

import sessionMiddleware from 'app/middlewares/session';

/**
 * @type function[]
 */
const middlewares = [
  express.static(path.resolve(__dirname, '../..', 'public')),
  cookieParser(),
  bodyParser.urlencoded({ extended: true }),
  bodyParser.json(),
  session(sessionMiddleware(process.env.NODE_ENV)),
  flash(),
  passport.initialize(),
  passport.session(),
];

export default middlewares;

export { default as notFound } from './not-found';
export { default as serverError } from './server-error';
export { default as hasStore, storeSession } from './store';
export { default as inputValidation } from './input-validation';
