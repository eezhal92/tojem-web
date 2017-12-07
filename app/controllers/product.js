import database from '../models';

/**
 * @class
 */
class Product {
  constructor(db) {
    this.database = db;
  }
  /**
   * Tampilkan semua daftar product.
   *
   * @param {Express.Request} req
   * @param {Express.Response} res
   */
  showAll(req, res) {
    this.database.products.findAll()
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
   * @param {Express.Request} req
   * @param {Express.Response} res
   */
  showById(req, res) {
    this.database.products.findById(req.params.id)
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

  // eslint-disable-next-line
  showForm (req, res) {
    res.render('product-create');
  }

  /**
   * Menyimpan record baru ke database.
   *
   * @param {Express.Request} req
   * @param {Express.Response} res
   */
  store(req, res) {
    const { name } = req.body;

    this.database.products.create({ name })
      .then((product) => {
        res.redirect(`/products/${product.id}`);
      })
      .catch((error) => {
        res.send(error);
      });
  }

  // eslint-disable-next-line
  destroy(req, res) {
    const error = new Error('Not implemented');

    return res.send(error);
  }
}

export default new Product(database);
