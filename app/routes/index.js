import express from 'express';

import auth from './auth';
import tojem from './tojem';
import backStore from './backstore';
import onboarding from './onboarding';

const router = express.Router();

router.use(tojem);
router.use(auth);
router.use(onboarding);
router.use(backStore);

export default router;
