import http from 'http';
import app from '../app';

const PORT = process.env.PORT || 3000;

http.createServer(app).listen(PORT, () => {
  if (process.env.NODE_ENV !== 'production') {
    console.log('Running on PORT %s', PORT); // eslint-disable-line no-console
  }
});
