const router = require('express').Router()
const check = require('express-validator').check
const bodyParser = require('body-parser')
const userController = require('../controllers/user.controller')

router.get('/login', userController.get_Login)
router.post(
  '/login',
  bodyParser.urlencoded({ extended: true }),
  check('email')
    .not()
    .isEmpty()
    .withMessage('Please Enter Email')
    .isEmail()
    .withMessage('Invalid Format'),
  check('password')
    .not()
    .isEmpty()
    .withMessage('Please Enter Password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters'),
  userController.post_Login
)
router.get('/signup', userController.get_Signup)
router.post(
  '/signup',
  bodyParser.urlencoded({ extended: true }),
  check('username').not().isEmpty().withMessage('Username is required'),
  check('email')
    .not()
    .isEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Invalid Format'),
  check('password')
    .not()
    .isEmpty()
    .withMessage('password is required')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters'),
  check('confirmpassword').custom((value, { req }) => {
    if (value === req.body.password) return true
    else throw 'Passwords do not match'
  }),
  userController.post_Signup
)
router.all('/logout', userController.logout)

module.exports = router
