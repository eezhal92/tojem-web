/**
 * Order routing
 */

import express from 'express';

import order from 'app/controllers/api/order';
import { inputValidation } from 'app/middlewares';

import constraints from 'app/constraints/api/order';

const router = express.Router();

router.post('/', inputValidation(constraints.processTransaction), order.processTransaction);

export default router;
