import csrf from 'csurf';
import express from 'express';
import ces from 'connect-ensure-login';

import product from 'app/controllers/product';

const csrfProtection = csrf({ cookie: true });

const router = express.Router();

router.use(ces.ensureLoggedIn('/login'));

router.get('/', product.showAll);
router.get('/create', csrfProtection, product.showCreateForm);
router.post('/create', csrfProtection, product.store);
router.get('/:id', product.showById);
router.get('/:id/edit', csrfProtection, product.showEditForm);
router.post('/:id', csrfProtection, product.update);
router.delete('/:id', product.deactivate);

export default router;
