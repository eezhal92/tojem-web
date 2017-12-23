/**
 * Order routing
 */

import express from 'express';
import inputValidation from 'app/middlewares/input-validation';
import { processTransaction } from 'app/constraints/api/order';
import orderApiController from 'app/controllers/api/order-controller';

const router = express.Router();

router.post('/', inputValidation(processTransaction), orderApiController.processTransaction);

export default router;
