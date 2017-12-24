import path from 'path';
import express from 'express';
import router from 'app/routes';
import notFound from 'app/middlewares/not-found';
import baseMiddlewares from 'app/middlewares/base';
import serverError from 'app/middlewares/server-error';

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.resolve(__dirname, '..', 'view'));

app.use(...baseMiddlewares);
app.use(router);
app.use(notFound);
app.use(serverError);

export default app;
