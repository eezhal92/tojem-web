import path from 'path';
import express from 'express';
import passport from 'passport';
import bodyParser from 'body-parser';
import session from 'express-session';
import cookieParser from 'cookie-parser';

/**
 * @type function[]
 */
const middlewares = [
  express.static(path.resolve(__dirname, '../..', 'public')),
  cookieParser(),
  bodyParser.urlencoded({ extended: true }),
  bodyParser.json(),
  // @todo change session driver to sequelize
  session({ secret: 'keyboard cat', resave: true, saveUninitialized: true }),
  passport.initialize(),
  passport.session(),
];

export default middlewares;

export { default as notFound } from './not-found';
export { default as serverError } from './server-error';
export { default as hasStore, storeSession } from './store';
export { default as inputValidation } from './input-validation';
