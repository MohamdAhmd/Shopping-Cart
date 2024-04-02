const mongoose = require('mongoose')
const config = require('../config')
const cartModel = require('./cart.model')
const orderSchema = mongoose.Schema({
  name: String,
  price: Number,
  amount: Number,
  userId: String,
  productId: String,
  timestamp: Number,
  address: String,
  status: {
    type: String,
    default: 'pending',
  },
  // eslint-disable-next-line no-dupe-keys
  timestamp: Number,
})

const Order = mongoose.model('order', orderSchema)

exports.addNewOrder = (data) => {
  return new Promise((resolve, reject) => {
    cartModel
      .deleteCart(data.cartId)
      .then(() => mongoose.connect(config.DB_URL))
      .then(() => {
        data.timestamp = Date.now()
        // eslint-disable-next-line prefer-const
        let order = new Order(data)
        return order.save()
      })
      .then(() => {
        mongoose.disconnect()
        resolve()
      })
      .catch((err) => {
        mongoose.disconnect()
        reject(err)
      })
  })
}

exports.getOrderByUser = (userId) => {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(config.DB_URL)
      .then(() => {
        return Order.find(
          { userId: userId },
          {},
          { sort: { timestamp: -1 } }
        ).then((items) => {
          mongoose.disconnect()
          resolve(items)
        })
      })
      .catch((err) => {
        mongoose.disconnect()
        reject(err)
      })
  })
}

exports.cancelOrder = (id) => {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(config.DB_URL)
      .then(() => {
        return Order.findByIdAndDelete(id).then(() => {
          mongoose.disconnect()
          resolve()
        })
      })
      .catch((err) => {
        mongoose.disconnect()
        reject(err)
      })
  })
}
exports.cancelAllOrders = (id) => {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(config.DB_URL)
      .then(() => {
        return Order.deleteMany(id).then(() => {
          mongoose.disconnect()
          resolve()
        })
      })
      .catch((err) => {
        mongoose.disconnect()
        reject(err)
      })
  })
}

exports.orderAll = (data) => {
  return new Promise((resolve, reject) => {
    cartModel
      .deleteCart(data.cartId)
      .then(() => mongoose.connect(config.DB_URL))
      .then(() => {
        data.timestamp = Date.now()
        // eslint-disable-next-line prefer-const
        let order = new Order(data)
        return order.save()
      })
      .then(() => {
        mongoose.disconnect()
        resolve()
      })
      .catch((err) => {
        mongoose.disconnect()
        reject(err)
      })
  })
}
