import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';
import router from './route';

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.resolve(__dirname, '..', 'view'));

app.use(express.static(path.resolve(__dirname, '..', 'public')));
app.use(bodyParser.urlencoded({ extended: true }));

app.use(router);

export default app;
