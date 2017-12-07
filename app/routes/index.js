import express from 'express';

import auth from './auth';
import backStore from './back-store';

const router = express.Router();

router.get('/', (request, response) => {
  response.send('homepage');
});
router.use('/back-store', backStore);
router.use(auth);

export default router;
