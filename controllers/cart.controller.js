const cartModel = require('../models/cart.model')
const validResult = require('express-validator').validationResult
//###########################################################################################################
//###########################################################################################################
exports.getCart = (req, res) => {
  cartModel
    .getuserCart(req.session.userId)
    .then((iteams) => {
      res.render('cart', {
        items: iteams,
        isUser: true,
        isAdmin: req.session.isAdmin,
        validationErrors: req.flash('validationErrors')[0],
        userId: req.session.userId,
        pageTitle: 'Cart',
      })
    })
    .catch((err) => {
      res.redirect('/error')
      console.log(err)
    })
}
//###########################################################################################################
//###########################################################################################################

exports.postCart = (req, res) => {
  if (validResult(req).isEmpty()) {
    cartModel
      .addNewItem(
        {
          name: req.body.name,
          price: req.body.price,
          amount: req.body.amount,
          productId: req.body.productId,
          userId: req.session.userId,
          timestamp: Date.now(),
        },
        req.body.productId
      )
      .then(() => {
        res.redirect('/cart')
      })
      .catch((err) => {
        console.log(err)
        res.redirect('/error')
      })
  } else {
    req.flash('validationErrors', validResult(req).array())
    if (req.body.redirectTo === '/') res.redirect('/')
    else {
      const id = req.body.productId
      const path = '/product/' + id
      res.redirect(path)
    }
  }
}
//###########################################################################################################
//###########################################################################################################
exports.saveCart = (req, res) => {
  if (validResult(req).isEmpty()) {
    cartModel
      .saveEdit(req.body.cartId, {
        amount: req.body.amount,
        timestamp: Date.now(),
      })
      .then(() => {
        res.redirect('/cart')
      })
      .catch((err) => {
        console.log(err)
        res.redirect('/error')
      })
  } else {
    req.flash('validationErrors', validResult(req).array())
    res.redirect('/cart')
  }
}
//###########################################################################################################
//###########################################################################################################
exports.deleteCart = (req, res) => {
  cartModel
    .deleteCart(req.body.cartId)
    .then(() => res.redirect('/cart'))
    .catch((err) => {
      res.redirect('/error')
      console.log(err)
    })
}
//###########################################################################################################
//###########################################################################################################
exports.deleteAllCarts = (req, res) => {
  cartModel
    .deleteallCarts()
    .then(() => res.redirect('/cart'))
    .catch((err) => {
      res.redirect('/error')
      console.log(err)
    })
}
