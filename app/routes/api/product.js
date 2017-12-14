/**
 * Product routing
 */

import express from 'express';
import product from 'app/controllers/api/product';

const router = express.Router();

router.get('/', product.showAll);

export default router;
