/**
 * Api routing
 */

import express from 'express';

import order from './order';
import product from './product';

const router = express.Router();

router.use('/orders', order);
router.use('/products', product);

export default router;
