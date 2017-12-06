import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';
import * as database from './database';

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.resolve(__dirname, 'views'));

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

/**
 * Lihat daftar produk
 */
app.get('/', (req, res) => {
  database.Product.findAll()
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

  database.Product.create({ name })
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
  database.Product.findById(req.params.id)
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

/**
 * Lihat form posting
 */
app.get('/posts/create', (req, res) => {
  database.Product.findAll()
    .then((products) => {
      res.render('post-create', { products });
    })
    .catch((error) => {
      res.send(error);
    });
});

/**
 * Lihat detail posting
 */
app.get('/posts/:id', (req, res) => {
  database.Post.findById(req.params.id, {
    include: [{ model: database.Product }],
  })
    .then((post) => {
      res.render('post-show', { post });
    })
    .catch((error) => {
      res.send(error);
    });
});

/**
 * Lihat semua posting
 */
app.get('/posts', (req, res) => {
  database.Post.findAll({
    include: [{ model: database.Product }],
  })
    .then((posts) => {
      res.render('post-list', { posts });
    })
    .catch((error) => {
      res.send(error);
    });
});

/**
 * Lihat form posting
 */
app.post('/posts/create', (req, res) => {
  const { product_id: productId, content } = req.body;
  const price = parseInt(req.body.price, 10);

  database.Post.create({ productId, content, price })
    .then((product) => {
      res.redirect(`/posts/${product.id}`);
    })
    .catch((error) => {
      res.send(error);
    });
});

export default app;
