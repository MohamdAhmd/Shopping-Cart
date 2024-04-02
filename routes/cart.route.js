const router = require('express').Router()
const check = require('express-validator').check
const protectRoute = require('./protectRoutes/userProtect')
const bodyParser = require('body-parser')
const cartController = require('../controllers/cart.controller')
router.get('/', protectRoute.isUser, cartController.getCart)

router.post(
  '/',
  protectRoute.isUser,
  bodyParser.urlencoded({ extended: true }),
  check('amount')
    .not()
    .isEmpty()
    .withMessage('Amount Is Required')
    .isInt({ min: 1 })
    .withMessage('Amount must be greater than 1'),
  cartController.postCart
)

router.post(
  '/save',
  protectRoute.isUser,
  bodyParser.urlencoded({ extended: true }),
  check('amount')
    .not()
    .isEmpty()
    .withMessage('Amount Is Required')
    .isInt({ min: 1 })
    .withMessage('Amount must be greater than 1'),
  cartController.saveCart
)
router.post(
  '/delete',
  protectRoute.isUser,
  bodyParser.urlencoded({ extended: true }),
  cartController.deleteCart
)

module.exports = router
