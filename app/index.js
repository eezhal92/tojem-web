import path from 'path';
import express from 'express';

import router from './routes';
import middlewares from './middlewares';

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.resolve(__dirname, '..', 'view'));

app.use(...middlewares);
app.use(router);

export default app;
