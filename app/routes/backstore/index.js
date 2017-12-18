/**
 * Store owner's routing
 */

import express from 'express';

import product from './product';
import pointOfSales from './point-of-sales';

const router = express.Router();

router.use('/products', product);
router.use('/pos', pointOfSales);

export default router;
