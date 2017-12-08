import csrf from 'csurf';
import express from 'express';
import ces from 'connect-ensure-login';
import product from '../../controllers/product';

const csrfProtection = csrf({ cookie: true });

const router = express.Router();

router.use(ces.ensureLoggedIn('/login'));

router.get('/', product.showAll);
router.get('/create', csrfProtection, product.showForm);
router.get('/:id', product.showById);
router.post('/create', csrfProtection, product.store);
router.delete('/create', product.destroy);

export default router;
