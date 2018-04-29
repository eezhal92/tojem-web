/**
 * Product routing
 */

import express from 'express';
import { multer, sendUploadToGCS } from 'app/lib/images';
import productApiController from 'app/controllers/api/product-controller';

const router = express.Router();

router.get('/', productApiController.showAll);
router.post(
  '/:id/images',
  multer.single('image'),
  sendUploadToGCS,
  productApiController.uploadImage,
);

export default router;
