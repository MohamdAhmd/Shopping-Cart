const mongoose = require('mongoose')
const config = require('../config')

const productSchema = mongoose.Schema({
  name: String,
  image: String,
  price: Number,
  description: String,
  category: String,
})

exports.getAllProducts = () => {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(config.DB_URL)
      .then(() => {
        console.log('DB Connection Successfully')
        return product.find({})
      })
      .then((products) => {
        mongoose.disconnect()
        resolve(products)
      })
      .catch((err) => {
        console.log(err)
        reject(err)
      })
  })
}
//------------------------------------------------------------------------------
//########################################################################
//########################################################################
exports.filterByCategory = (category) => {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(config.DB_URL)
      .then(() => {
        return product.find({ category: category })
      })
      .then((products) => {
        mongoose.disconnect()
        resolve(products)
      })
      .catch((err) => {
        console.log(err)
        reject(err)
      })
  })
}
//########################################################################
//########################################################################
exports.getProductDtails = (productId) => {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(config.DB_URL)
      .then(() => {
        return product.findById(productId)
      })
      .then((product) => {
        mongoose.disconnect()
        resolve(product)
      })
      .catch((err) => {
        console.log(err)
        reject(err)
      })
  })
}
//########################################################################
//########################################################################
exports.getOne = () => {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(config.DB_URL)
      .then(() => {
        return product.findOne({})
      })
      .then((product) => {
        mongoose.disconnect()
        resolve(product)
      })
      .catch((err) => {
        console.log(err)
        reject(err)
      })
  })
}

const product = mongoose.model('Product', productSchema)
