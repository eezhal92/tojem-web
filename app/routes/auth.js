/**
 * Auth routing
 */

import express from 'express';
import ces from 'connect-ensure-login';

import auth from '../controllers/auth';
import passport from '../lib/passport';

const router = express.Router();

router.get('/login', ces.ensureLoggedOut('/'), auth.getLoginForm);
router.get('/auth/facebook', passport.authenticate('facebook', { scope: ['email'] }));
router.get(
  '/auth/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/login' }),
  auth.redirectOnAuthenticated,
);

export default router;
