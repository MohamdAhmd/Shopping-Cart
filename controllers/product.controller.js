const productsModel = require('../models/products.model')
exports.getProductDetails = async (req, res) => {
  const productId = req.params.id
  try {
    const product = await productsModel.getProductDtails(productId)
    res.render('product', {
      product: product,
      isUser: true,
      isAdmin: req.session.isAdmin,
      validationErrors: req.flash('validationErrors')[0],
    })
  } catch (err) {
    console.log(err)
  }
}
exports.getProduct = async (req, res) => {
  try {
    const product = await productsModel.getOne()
    res.render('product', {
      product: product,
      isAdmin: req.session.isAdmin,
      isUser: true,
    })
  } catch (err) {
    console.log(err)
  }
}
