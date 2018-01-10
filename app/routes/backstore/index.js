/**
 * Store owner's routing
 */

import express from 'express';

import product from './product';
import pointOfSales from './point-of-sales';
import report from './report';
import transaction from './transaction';

const router = express.Router();

router.use('/products', product);
router.use('/pos', pointOfSales);
router.use('/report', report);
router.use('/transaction', transaction);

export default router;
