import express from 'express';

import auth from './auth';
import backStore from './back-store';
import onboarding from './onboarding';

const router = express.Router();

router.get('/', (request, response) => {
  response.send('homepage');
});
router.use(auth);
router.use(onboarding);
router.use('/back-store', backStore);

export default router;
