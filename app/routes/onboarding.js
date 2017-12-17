/**
 * Seller onboarding routing
 */

import csrf from 'csurf';
import express from 'express';
import ces from 'connect-ensure-login';

import db from 'app/models';
import { hasStore } from 'app/middlewares';
import onB from 'app/controllers/onboarding';
import onBConstraint from 'app/constraints/onboarding';
import inputValidation from 'app/middlewares/input-validation';

const router = express.Router();
const defaultMiddlewares = [
  ces.ensureLoggedIn('/login'),
  hasStore(db, {
    condition: true,
    redirectPath: '/backstore/products',
  }),
  csrf({ cookie: true }),
];

router.route('/onboard/create-store')
  .get(...defaultMiddlewares, onB.createStoreForm)
  .post(...defaultMiddlewares, inputValidation(onBConstraint), onB.createStore);

export default router;
