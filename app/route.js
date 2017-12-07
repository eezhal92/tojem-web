import express from 'express';
import product from './controllers/product';

const router = express.Router();

router.get('/', product.showAll.bind(product));
router.get('/products/create', product.showForm.bind(product));
router.get('/products/:id', product.showById.bind(product));
router.post('/products/create', product.store.bind(product));
router.delete('/products/create', product.destroy.bind(product));

export default router;
