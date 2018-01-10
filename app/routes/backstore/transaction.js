import express from 'express';
import ces from 'connect-ensure-login';
import transactionController from 'app/controllers/transaction-controller';

const router = express.Router();

router.use(ces.ensureLoggedIn('/login'));

router.get('/', transactionController.showTransactionList);
router.get('/:id', transactionController.showTransactionDetail);

export default router;
