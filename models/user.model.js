const mongoose = require('mongoose')
const config = require('../config')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
})

exports.register = (username, email, password) => {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(config.DB_URL)
      .then(() => {
        return User.findOne({ email: email })
      })
      .then((user) => {
        if (user) {
          mongoose.disconnect()
          reject('The user already exists | Please Enter a valid Email')
        } else {
          return bcrypt.hash(password, 10)
        }
      })
      .then((hahPassword) => {
        const user = new User({
          username: username,
          email: email,
          password: hahPassword,
        })
        return user.save()
      })
      .then(() => {
        mongoose.disconnect()
        resolve('User Created Successfully')
      })
      .catch((err) => {
        mongoose.disconnect()
        reject(err)
      })
  })
}
//################################################################################################
//################################################################################################
exports.login = (email, password) => {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(config.DB_URL)
      .then(() => {
        return User.findOne({ email: email })
      })
      .then((user) => {
        if (!user) {
          mongoose.disconnect()
          reject('Please Enter a valid Email')
        } else {
          bcrypt.compare(password, user.password).then((valid) => {
            if (!valid) {
              mongoose.disconnect()
              reject('Password Incorrect')
            } else {
              mongoose.disconnect()
              resolve({
                id: user._id,
                isAdmin: user.isAdmin,
              })
            }
          })
        }
      })
      .catch((err) => {
        mongoose.disconnect()
        reject(err)
      })
  })
}

const User = mongoose.model('user', userSchema)
