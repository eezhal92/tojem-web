import express from 'express';
import inputValidation from 'app/middlewares/input-validation';
import productController from 'app/controllers/product-controller';

const router = express.Router();

router.get('/', productController.showAll);
router.get('/create', productController.showCreateForm);
router.get('/:id', productController.showById);
router.get('/:id/edit', productController.showEditForm);
router.delete('/:id', productController.deactivate);

export default router;
