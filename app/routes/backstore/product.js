import csrf from 'csurf';
import express from 'express';
import ces from 'connect-ensure-login';
import inputValidation from 'app/middlewares/input-validation';
import productController from 'app/controllers/product-controller';
import { createProductConstraints } from 'app/constraints/backstore/product';

const csrfProtection = csrf({ cookie: true });
const router = express.Router();

router.use(ces.ensureLoggedIn('/login'));

router.get('/', productController.showAll);
router.get('/create', csrfProtection, productController.showCreateForm);
router.post(
  '/create',
  csrfProtection,
  inputValidation(createProductConstraints),
  productController.store,
);
router.get('/:id', productController.showById);
router.get('/:id/edit', csrfProtection, productController.showEditForm);
router.post(
  '/:id',
  csrfProtection,
  inputValidation(createProductConstraints),
  productController.update,
);
router.delete('/:id', productController.deactivate);

export default router;
