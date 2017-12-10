/**
 * Visitor's routing
 */

import express from 'express';

import home from 'app/controllers/home';

const router = express.Router();

router.get('/', home);

export default router;
