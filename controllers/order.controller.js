const cartModel = require('../models/cart.model')
const validResult = require('express-validator').validationResult
const oredrModel = require('../models/order.model')
exports.orderVerify = (req, res) => {
  cartModel
    .getItemById(req.query.order)
    .then((cartItem) => {
      res.render('verify-order', {
        cart: cartItem,
        isUser: true,
        validationError: req.flash('validationErrors')[0],
      })
    })
    .catch((err) => console.log(err))
}
exports.getOrders = (req, res) => {
  oredrModel.getOrderByUser(req.session.userId).then((items) => {
    res.render('orders', { items: items, isUser: true })
  })
}

exports.addOrder = (req, res) => {
  if (validResult(req).isEmpty()) {
    oredrModel
      .addNewOrder(req.body)
      .then(() => res.redirect('orders'))
      .catch((err) => console.log(err))
  } else {
    req.flash('validationErrors', validResult(req).array())
    res.redirect('/verify-order?order=' + req.body.cartId)
  }
}

exports.cancelOrder = (req, res) => {
  oredrModel
    .cancelOrder(req.body.orderId)
    .then(() => {
      res.redirect('/orders')
    })
    .catch((err) => console.log(err))
}
exports.cancelAllOrders = (req, res) => {
  oredrModel
    .cancelAllOrders(req.body.orderId)
    .then(() => {
      res.redirect('/orders')
    })
    .catch((err) => console.log(err))
}

exports.verifyAllorders = (req, res) => {
  cartModel
    .getItemsByuserId(req.query.userId)
    .then((cartItems) => {
      res.render('verify-all-orders', {
        cart: cartItems,
        isUser: true,
        validationError: req.flash('validationErrors')[0],
      })
    })
    .catch((err) => console.log(err))
}
