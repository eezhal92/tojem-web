/**
 * Seller onboarding routing
 */

import csrf from 'csurf';
import express from 'express';
import ces from 'connect-ensure-login';

import db from '../models';
import { hasStore } from '../middlewares';
import onboarding from '../controllers/onboarding';

const router = express.Router();

/**
 * @todo add request payload validation middleware
 */
router.route('/onboard/create-store')
  .get(
    ces.ensureLoggedIn('/login'),
    hasStore(db, {
      condition: true,
      redirectPath: '/backstore/products',
    }),
    csrf({ cookie: true }),
    onboarding.createStoreForm,
  )
  .post(
    ces.ensureLoggedIn('/login'),
    hasStore(db, {
      condition: true,
      redirectPath: '/backstore/products',
    }),
    csrf({ cookie: true }),
    onboarding.createStore,
  );

export default router;
