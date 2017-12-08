import express from 'express';

import auth from './auth';
import backStore from './backstore';
import onboarding from './onboarding';

const router = express.Router();

router.get('/', (request, response) => {
  response.render('tojem/homepage');
});
router.use(auth);
router.use(onboarding);
router.use('/backstore', backStore);

export default router;
