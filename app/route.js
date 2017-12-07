import express from 'express';
import product from './controllers/product';

const router = express.Router();

router.get('/', product.showAll);
router.get('/products/create', product.showForm);
router.get('/products/:id', product.showById);
router.post('/products/create', product.store);
router.delete('/products/create', product.destroy);

export default router;
