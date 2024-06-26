const productsModel = require('../models/products.model')

exports.getHome = (req, res) => {
  const category = req.query.category
  const validCategories = ['clothes', 'phones', 'electronics', 'accessories']
  let productsPromise
  if (category && validCategories.includes(category))
    productsPromise = productsModel.filterByCategory(category)
  else productsPromise = productsModel.getAllProducts()
  productsPromise
    .then((products) => {
      res.render('index', {
        products: products,
        isUser: req.session.userId,
        isAdmin: req.session.isAdmin,
        validationErrors: req.flash('validationErrors')[0],
        pageTitle: 'Home',
      })
    })
    .catch((err) => {
      console.log(err)
      res.redirect('/error')
    })
}
