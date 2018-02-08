/**
 * Store owner's routing
 */

import express from 'express';
import ces from 'connect-ensure-login';

import product from './product';
import pointOfSales from './point-of-sales';
import report from './report';
import transaction from './transaction';

const router = express.Router();
const backstore = express.Router();

backstore.use('/backstore', ces.ensureLoggedIn('/login'), router);

router.use('/products', product);
router.use('/pos', pointOfSales);
router.use('/report', report);
router.use('/transaction', transaction);

export default backstore;
