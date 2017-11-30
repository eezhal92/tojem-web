import express from 'express';
import * as database from './database';
import bodyParser from 'body-parser';

const app = express();

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

/**
 * Lihat daftar produk
 */
app.get('/', (req, res) => {
  database.Product.findAll()
    .then((products) => {
      res.render('product-list', { products: products });
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
  var name = req.body.name;

  database.Product.create({
    name: name,
  })
    .then((product) => {
      res.redirect('/products/' + product.id);
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

      res.render('product-detail', { product: product });
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
      res.render('post-create', { products: products });
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
      res.render('post-show', { post: post });
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
      res.render('post-list', { posts: posts });
    })
    .catch((error) => {
      res.send(error);
    });
});

/**
 * Lihat form posting
 */
app.post('/posts/create', (req, res) => {
  const productId = req.body.product_id;
  const content = req.body.content;
  const price = parseInt(req.body.price);

  database.Post.create({
    productId: productId,
    content: content,
    price: price,
  })
    .then((product) => {
      res.redirect('/posts/' + product.id);
    })
    .catch((error) => {
      res.send(error);
    });
});

export default app;
