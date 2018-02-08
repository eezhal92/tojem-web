import express from 'express';
import pointOfSalesController from 'app/controllers/point-of-sales-controller';

const router = express.Router();

router.get('/', pointOfSalesController.showTransactionForm);

export default router;
