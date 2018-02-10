import express from 'express';
import reportController from 'app/controllers/report-controller';

const router = express.Router();

router.get('/', reportController.showDashboard);

export default router;
