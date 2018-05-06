import express from 'express';
import inputValidation from 'app/middlewares/input-validation';
import productController from 'app/controllers/product-controller';
import { createProductConstraints } from 'app/constraints/backstore/product';

const router = express.Router();

router.get('/', productController.showAll);
router.get('/create', productController.showCreateForm);
router.get('/:id', productController.showById);
router.get('/:id/edit', productController.showEditForm);
router.post(
  '/:id',
  inputValidation(createProductConstraints),
  productController.update,
);
router.delete('/:id', productController.deactivate);

export default router;
