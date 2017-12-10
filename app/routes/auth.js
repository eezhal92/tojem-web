/**
 * Auth routing
 */

import express from 'express';
import ces from 'connect-ensure-login';

import db from '../models';
import auth from '../controllers/auth';
import passport from '../lib/passport';
import { hasStore, storeSession } from '../middlewares';

const router = express.Router();

router.get('/login', ces.ensureLoggedOut('/'), auth.getLoginForm);
router.get('/auth/facebook', passport.authenticate('facebook', { scope: ['email'] }));
router.get(
  '/auth/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/login' }),
  hasStore(db, {
    condition: false,
    redirectPath: '/onboard/create-store',
  }),
  storeSession(db),
  auth.redirectOnAuthenticated,
);

export default router;
