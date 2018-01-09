/**
 * Visitor's routing
 */

import express from 'express';
import homeController from 'app/controllers/home-controller';

const router = express.Router();

router.get('/', homeController.showHomePage);
router.get('/cari', (request, response) => {
  const data = {
    user: request.user,
    query: request.query.q || '',
  };

  response.render('tojem/search-result', data);
});

export default router;
