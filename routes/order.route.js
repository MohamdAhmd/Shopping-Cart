const route = require('express').Router()
const protectRoute = require('./protectRoutes/userProtect')
const orderController = require('../controllers/order.controller')
const check = require('express-validator').check
const bodyParser = require('body-parser')

route.get('/verify-order', protectRoute.isUser, orderController.orderVerify)
route.get('/orders', protectRoute.isUser, orderController.getOrders)
route.post(
  '/orders',
  protectRoute.isUser,
  bodyParser.urlencoded({ extended: true }),
  check('address').not().isEmpty().withMessage('address is required'),
  orderController.addOrder
)

route.post(
  '/orders/cancel',
  protectRoute.isUser,
  bodyParser.urlencoded({ extended: true }),
  orderController.cancelOrder
)
route.post(
  '/orders/cancelall',
  protectRoute.isUser,
  bodyParser.urlencoded({ extended: true }),
  orderController.cancelAllOrders
)
route.get(
  '/verify-all-orders',
  protectRoute.isUser,
  bodyParser.urlencoded({ extended: true }),
  orderController.verifyAllorders
)

module.exports = route
