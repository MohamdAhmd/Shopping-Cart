const productsModel = require('../models/products.model')
exports.getProductDetails = async (req, res) => {
  const productId = req.params.id
  try {
    const product = await productsModel.getProductDtails(productId)
    res.render('product', {
      product: product,
      isUser: true,
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
    })
  } catch (err) {
    console.log(err)
  }
}
