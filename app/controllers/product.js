import database from '../models';

class Product {
  /**
   * Tampilkan semua daftar product.
   *
   * @param {http.IncomingMessage} req
   * @param {http.ServerResponse}  res
   */
  showAll(req, res) {
    database.products.findAll()
      .then((products) => {
        res.render('product-list', { products });
      })
      .catch((error) => {
        res.send(error);
      });
  }

  /**
   * Tampilkan product secara spesifik berdasarkan productId.
   *
   * @param {http.IncomingMessage} req
   * @param {http.ServerResponse}  res
   */
  showById(req, res) {
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
  }

  /**
   * Tampilkan form menambahkan product.
   *
   * @param {http.IncomingMessage} req
   * @param {http.ServerResponse}  res
   */
  showForm(req, res) {
    res.render('product-create');
  }

  /**
   * Menyimpan record baru ke database.
   *
   * @param {http.IncomingMessage} req
   * @param {http.ServerResponse}  res
   */
  store(req, res) {
    const { name } = req.body;

    database.products.create({ name })
      .then((product) => {
        res.redirect(`/products/${product.id}`);
      })
      .catch((error) => {
        res.send(error);
      });
  }

  /**
   * Hapus record dari database.
   *
   * @param {http.IncomingMessage} req
   * @param {http.ServerResponse}  res
   */
  destroy(req, res) {
    const error = new Error;
    error.message = 'Not implemented';

    return res.send(error);
  }
}

export default new Product;
