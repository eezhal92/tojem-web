/**
 * Auth routing
 */

import express from 'express';
import ces from 'connect-ensure-login';
import db from 'app/models';
import passport from 'app/lib/passport';
import authController from 'app/controllers/auth-controller';
import { hasStore, storeSession } from 'app/middlewares/store';

const router = express.Router();

router.get('/login', ces.ensureLoggedOut('/'), authController.getLoginForm);
router.get('/auth/facebook', passport.authenticate('facebook', { scope: ['email'] }));
router.get(
  '/auth/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/login' }),
  hasStore(db, {
    condition: false,
    redirectPath: '/onboard/create-store',
  }),
  storeSession(db),
  authController.redirectOnAuthenticated,
);

export default router;
