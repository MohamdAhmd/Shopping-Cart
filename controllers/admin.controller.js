const productsModel = require('../models/products.model')
const validationResult = require('express-validator').validationResult

exports.addProduct = (req, res) => {
  res.render('addProduct', {
    isAdmin: true,
    isUser: true,
    validationErrors: req.flash('validationErrors'),
    productAdded: req.flash('productadd')[0],
  })
}
exports.postAddProduct = (req, res) => {
  if (validationResult(req).isEmpty()) {
    req.body.image = req.file.filename
    productsModel
      .addNewProduct(req.body)
      .then(() => {
        req.flash('productadd', true)
        res.redirect('/admin/add')
      })
      .catch((err) => console.log(err))
  } else {
    req.flash('validationErrors', validationResult(req).array())
    res.redirect('/admin/add')
  }
}
