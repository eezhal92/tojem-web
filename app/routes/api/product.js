/**
 * Product routing
 */

import express from 'express';
import { multer, sendUploadToGCS } from 'app/lib/images';
import productApiController from 'app/controllers/api/product-controller';
import inputValidation from 'app/middlewares/input-validation';
import { createProductConstraints } from 'app/constraints/backstore/product';

const router = express.Router();

router.get('/', productApiController.showAll);
router.post(
  '/:id/images',
  multer.single('image'),
  sendUploadToGCS,
  productApiController.uploadImage,
);
router.post('/create', inputValidation(createProductConstraints), productApiController.store);
router.post('/update', inputValidation(createProductConstraints), productApiController.update);
router.delete(
  '/:id/images/:imageId',
  productApiController.removeImage,
);

export default router;
