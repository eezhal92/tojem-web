/**
 * Api routing
 */

import express from 'express';

import order from './order';
import product from './product';
import report from './report';

const router = express.Router();
const api = express.Router();

api.use('/api', router);

router.use('/orders', order);
router.use('/products', product);
router.use('/reports', report);

export default api;
