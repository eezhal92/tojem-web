/**
 * Seller onboarding routing
 */

import csrf from 'csurf';
import express from 'express';
import ces from 'connect-ensure-login';
import db from 'app/models';
import { hasStore } from 'app/middlewares/store';
import inputValidation from 'app/middlewares/input-validation';
import { onBoardingTransaction } from 'app/constraints/onboarding';
import onboardingController from 'app/controllers/onboarding-controller';

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
  .get(...defaultMiddlewares, onboardingController.createStoreForm)
  .post(
    ...defaultMiddlewares,
    inputValidation(onBoardingTransaction),
    onboardingController.createStore,
  );

export default router;
