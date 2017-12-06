import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';

import database from '../db/models';

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.resolve(__dirname, 'views'));

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

/**
 * Lihat daftar produk
 */
app.get('/', (req, res) => {
  database.products.findAll()
    .then((products) => {
      res.render('product-list', { products });
    })
    .catch((error) => {
      res.send(error);
    });
});

/**
 * Lihat halaman buat produk
 */
app.get('/products/create', (req, res) => {
  res.render('product-create');
});

/**
 * Lihat halaman buat produk
 */
app.post('/products/create', (req, res) => {
  const { name } = req.body;

  database.products.create({ name })
    .then((product) => {
      res.redirect(`/products/${product.id}`);
    })
    .catch((error) => {
      res.send(error);
    });
});

/**
 * Lihat detail produk
 */
app.get('/products/:id', (req, res) => {
  database.products.findById(req.params.id)
    .then((product) => {
      if (!product) {
        res.render('not-found');

        return;
      }

      res.render('product-detail', { product });
    })
    .catch((error) => {
      res.send(error);
    });
});

export default app;
