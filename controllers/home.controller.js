const productsModel = require('../models/products.model')
exports.getHome = (_req, res) => {
  productsModel.getAllProducts().then((products) => {
    res.render('index', {
      products: products,
    })
  })
}
