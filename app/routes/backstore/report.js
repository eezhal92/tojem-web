import express from 'express';
import ces from 'connect-ensure-login';
import reportController from 'app/controllers/report-controller';

const router = express.Router();

router.use(ces.ensureLoggedIn('/login'));

router.get('/', reportController.showDashboard);

export default router;
