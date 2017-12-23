/**
 * Visitor's routing
 */

import express from 'express';
import homeController from 'app/controllers/home-controller';

const router = express.Router();

router.get('/', homeController.showHomePage);

export default router;
