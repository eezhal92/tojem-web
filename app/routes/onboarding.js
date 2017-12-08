/**
 * Seller onboarding routing
 */

import express from 'express';
import ces from 'connect-ensure-login';

import db from '../models';
import { hasStore } from '../middlewares';
import onboarding from '../controllers/onboarding';

const router = express.Router();

/**
 * @todo add request payload validation middleware
 * @todo add csrf validation
 */
router.route('/onboard/create-store')
  .get(
    ces.ensureLoggedIn('/login'),
    hasStore(db, {
      condition: true,
      redirectPath: '/back-store/products',
    }),
    onboarding.createStoreForm,
  )
  .post(
    ces.ensureLoggedIn('/login'),
    hasStore(db, {
      condition: true,
      redirectPath: '/back-store/products',
    }),
    onboarding.createStore,
  );

export default router;
