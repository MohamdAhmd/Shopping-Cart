const mongoose = require('mongoose')
const config = require('../config')
const cartSchema = mongoose.Schema({
  name: String,
  price: Number,
  amount: Number,
  productId: String,
  userId: String,
  timestamp: Number,
})
const cartIteam = mongoose.model('Cart', cartSchema)

exports.addNewItem = (data) => {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(config.DB_URL)
      .then(() => {
        const item = new cartIteam(data)
        return item.save()
      })
      .then(() => {
        mongoose.disconnect()
        resolve('New item has been drobed to databse now')
      })
      .catch((err) => {
        mongoose.disconnect()
        reject(err)
      })
  })
}

//################################################################################################//
exports.getuserCart = (userId) => {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(config.DB_URL)
      .then(() => {
        return cartIteam.find(
          { userId: userId },
          {},
          { sort: { timestamp: -1 } }
        )
      })
      .then((iteams) => {
        mongoose.disconnect()
        resolve(iteams)
      })
      .catch((err) => {
        mongoose.disconnect()
        reject(err)
      })
  })
}
//################################################################################################//
//################################################################################################//
exports.getuserCart = (userId) => {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(config.DB_URL)
      .then(() => {
        return cartIteam.find(
          { userId: userId },
          {},
          { sort: { timestamp: -1 } }
        )
      })
      .then((iteams) => {
        mongoose.disconnect()
        resolve(iteams)
      })
      .catch((err) => {
        mongoose.disconnect()
        reject(err)
      })
  })
}
//################################################################################################//
//################################################################################################//

exports.saveEdit = (id, newData) => {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(config.DB_URL)
      .then(() => cartIteam.updateOne({ _id: id }, newData))
      .then((iteams) => {
        mongoose.disconnect()
        resolve(iteams)
      })
      .catch((err) => {
        mongoose.disconnect()
        reject(err)
      })
  })
}

//################################################################################################//
//################################################################################################//

exports.deleteCart = (id) => {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(config.DB_URL)
      .then(() => cartIteam.findByIdAndDelete(id))
      .then(() => {
        mongoose.disconnect()
        resolve('Cart Delete Successfuly')
      })
      .catch((err) => {
        mongoose.disconnect()
        reject(err)
      })
  })
}

//################################################################################################//
//################################################################################################//

exports.getItemById = (id) => {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(config.DB_URL)
      .then(() => cartIteam.findById(id))
      .then((item) => {
        mongoose.disconnect()
        resolve(item)
      })
      .catch((err) => {
        mongoose.disconnect()
        reject(err)
      })
  })
}

//################################################################################################//
//################################################################################################//
exports.deleteallCarts = () => {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(config.DB_URL)
      .then(() => cartIteam.deleteMany())
      .then(() => {
        mongoose.disconnect()
        resolve('Cart Delete Successfuly')
      })
      .catch((err) => {
        mongoose.disconnect()
        reject(err)
      })
  })
}
//################################################################################################//
//################################################################################################//

exports.getItemsByuserId = (userid) => {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(config.DB_URL)
      .then(() => cartIteam.find(userid))
      .then((items) => {
        mongoose.disconnect()
        resolve(items)
      })
      .catch((err) => {
        mongoose.disconnect()
        reject(err)
      })
  })
}
