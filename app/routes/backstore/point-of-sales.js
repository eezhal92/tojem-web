import csrf from 'csurf';
import express from 'express';
import ces from 'connect-ensure-login';

import pointOfSales from 'app/controllers/point-of-sales';

const csrfProtection = csrf({ cookie: true });

const router = express.Router();

router.use(ces.ensureLoggedIn('/login'));

router.get('/', csrfProtection, pointOfSales.showTransactionForm);

export default router;
