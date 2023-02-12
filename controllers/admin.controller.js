const productsModel = require('../models/products.model')
const ordersModel = require('../models/order.model')
//const User = require('../models/user.model')
const validationResult = require('express-validator').validationResult

exports.addProduct = (req, res) => {
  res.render('addProduct', {
    isAdmin: true,
    isUser: true,
    validationErrors: req.flash('validationErrors'),
    productAdded: req.flash('productadd')[0],
    pageTitle: 'Add Product',
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
      .catch((err) => {
        console.log(err)
        res.redirect('/error')
      })
  } else {
    req.flash('validationErrors', validationResult(req).array())
    res.redirect('/admin/add')
  }
}
exports.getOrders = (req, res) => {
  ordersModel
    .getAllOrder()
    .then((items) => {
      res.render('manage-orders', {
        isUser: true,
        isAdmin: true,
        items: items,
        email: req.session.email,
        pageTitle: 'Manage Orders',
      })
    })
    .catch((err) => {
      res.redirect('/error')
      console.log(err)
    })
}

exports.postOrders = (req, res) => {
  ordersModel
    .editOrder(req.body.orderId, req.body.status)
    .then(() => res.redirect('/admin/orders'))
    .catch((err) => {
      console.log(err)
      res.redirect('/error')
    })
}
