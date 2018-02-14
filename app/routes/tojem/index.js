/**
 * Visitor's routing
 */

import express from 'express';

import homeController from 'app/controllers/home-controller';

const router = express.Router();

router.get('/', homeController.showHomePage);
router.get('/join', (request, response) => {
  response.render('landing-page/grow-together');
});
router.get('/cari', homeController.showSearchPage);
router.get('/item/:id', homeController.showProductDetailPage);

export default router;
