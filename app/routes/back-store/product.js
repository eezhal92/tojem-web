import express from 'express';
import ces from 'connect-ensure-login';

import product from '../../controllers/product';

const router = express.Router();

router.get('/', ces.ensureLoggedIn('/login'), product.showAll);
router.get('/create', product.showForm);
router.get('/:id', product.showById);
router.post('/create', product.store);
router.delete('/create', product.destroy);

export default router;
