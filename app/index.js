import path from 'path';
import express from 'express';

import router from './routes';
import middlewares, { serverError, notFound } from './middlewares';

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.resolve(__dirname, '..', 'view'));

app.use(...middlewares);
app.use(router);
app.use(notFound);
app.use(serverError);

export default app;
