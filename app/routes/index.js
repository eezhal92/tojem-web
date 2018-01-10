import express from 'express';

import viewData from 'app/lib/view-data';

import api from './api';
import auth from './auth';
import tojem from './tojem';
import backStore from './backstore';
import onboarding from './onboarding';

const router = express.Router();

const initAndSetDefaultViewData = (request, response, next) => {
  // todo: extract into dedicated middleware
  const hasUserAndStoreData = request.session && request.session.store && request.user;

  if (hasUserAndStoreData) {
    const sid = request.session.id;

    viewData.createFor(sid);
    viewData.setFor(sid, 'store', request.session.store);
    viewData.setFor(sid, 'user', request.user.dataValues);
  }

  next();
};

router.use(tojem);
router.use(auth);
router.use(onboarding);
router.use('/backstore', initAndSetDefaultViewData, backStore);
router.use('/api', api);

export default router;
