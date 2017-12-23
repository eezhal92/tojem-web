import csrf from 'csurf';
import express from 'express';
import ces from 'connect-ensure-login';
import pointOfSalesController from 'app/controllers/point-of-sales-controller';

const csrfProtection = csrf({ cookie: true });
const router = express.Router();

router.use(ces.ensureLoggedIn('/login'));

router.get('/', csrfProtection, pointOfSalesController.showTransactionForm);

export default router;
