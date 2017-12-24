/**
 * Product routing
 */

import express from 'express';
import productApiController from 'app/controllers/api/product-controller';

const router = express.Router();

router.get('/', productApiController.showAll);

export default router;
