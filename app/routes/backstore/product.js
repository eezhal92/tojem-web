import csrf from 'csurf';
import express from 'express';
import ces from 'connect-ensure-login';

import product from 'app/controllers/product';
import { inputValidation } from 'app/middlewares';
import { createProductConstraints } from 'app/constraints/backstore/product';

const csrfProtection = csrf({ cookie: true });

const router = express.Router();

router.use(ces.ensureLoggedIn('/login'));

router.get('/', product.showAll);
router.get('/create', csrfProtection, product.showCreateForm);
router.post(
  '/create',
  csrfProtection,
  inputValidation(createProductConstraints),
  product.store,
);
router.get('/:id', product.showById);
router.get('/:id/edit', csrfProtection, product.showEditForm);
router.post(
  '/:id',
  csrfProtection,
  inputValidation(createProductConstraints),
  product.update,
);
router.delete('/:id', product.deactivate);

export default router;
