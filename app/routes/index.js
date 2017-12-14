import express from 'express';

import api from './api';
import auth from './auth';
import tojem from './tojem';
import backStore from './backstore';
import onboarding from './onboarding';

const router = express.Router();

router.use(tojem);
router.use(auth);
router.use(onboarding);
router.use('/backstore', backStore);
router.use('/api', api);

export default router;
