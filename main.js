import app from './src/app';

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  if (process.env.NODE_ENV !== 'production') {
    console.log('Running on PORT %s', PORT); // eslint-disable-line no-console
  }
});
