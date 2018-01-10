/**
 * Report routing
 */

import express from 'express';
import reportApiController from 'app/controllers/api/report-controller';

const router = express.Router();

// todo it should be only accessible to owner and employee of store
router.get('/:id/orders', reportApiController.orders);

export default router;
