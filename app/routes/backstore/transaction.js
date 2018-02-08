import express from 'express';
import transactionController from 'app/controllers/transaction-controller';

const router = express.Router();

router.get('/', transactionController.showTransactionList);
router.get('/:id', transactionController.showTransactionDetail);

export default router;
