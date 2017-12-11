import csrf from 'csurf';
import express from 'express';
import ces from 'connect-ensure-login';

import pos from 'app/controllers/pos';

const csrfProtection = csrf({ cookie: true });

const router = express.Router();

router.use(ces.ensureLoggedIn('/login'));

router.get('/', csrfProtection, pos.showTransactionForm);
router.post('/', csrfProtection, pos.processTransaction);

export default router;
