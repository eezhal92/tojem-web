/**
 * Store owner's routing
 */

import express from 'express';

import product from './product';
import pointOfSales from './point-of-sales';
import report from './report';

const router = express.Router();

router.use('/products', product);
router.use('/pos', pointOfSales);
router.use('/report', report);

export default router;
