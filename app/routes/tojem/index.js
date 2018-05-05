/**
 * Visitor's routing
 */

import express from 'express';

import homeController from 'app/controllers/home-controller';

const router = express.Router();

router.get('/', (request, response) => {
  response.render('landing-page/grow-together');
});
router.get('/join', (request, response) => {
  response.render('landing-page/grow-together');
});

// Disabled, not ready yet
// router.get('/cari', homeController.showSearchPage);
// router.get('/item/:id', homeController.showProductDetailPage);

export default router;
