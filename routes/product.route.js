const express = require('express')
const router = express.Router()
const productController = require('../controllers/product.controller')
const protectRoute = require('./protectRoutes/userProtect')

router.get('/', protectRoute.isUser, productController.getProduct)
router.get('/:id', protectRoute.isUser, productController.getProductDetails)

module.exports = router
