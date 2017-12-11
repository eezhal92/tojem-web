/**
 * Store owner's routing
 */

import express from 'express';

import product from './product';
import pos from './pos';

const router = express.Router();

router.use('/products', product);
router.use('/pos', pos);

export default router;
