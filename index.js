const express = require('express')
const path = require('path')

const cookieParser = require('cookie-parser')
const session = require('express-session')
const SessionStore = require('connect-mongodb-session')(session)
const flash = require('connect-flash')

const homeRouter = require('./routes/home.route')
const userRouter = require('./routes/user.route')
const productRouter = require('./routes/product.route')
const cartRouter = require('./routes/cart.route')
const orderRouter = require('./routes/order.route')
const adminRouter = require('./routes/admin.route')
const config = require('./config')

const app = express()
// middleware
app.use(flash())
app.use(express.json())
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.static(path.join(__dirname, 'images')))

const STORE = new SessionStore({
  uri: config.DB_URL,
  collection: 'sessions',
})

app.use(
  session({
    secret: 'any thing ghdsavchgvsdhcvhdsvck',
    saveUninitialized: false,
    //cookie: {
    // maxAge: 60 * 60 * 60 * 100, // in milliseconds
    //},
    store: STORE,
  })
)
app.set('views', 'views')
app.set('view engine', 'ejs')

app.use(userRouter)
app.use('/', homeRouter)
app.use('/product', productRouter)
app.use('/cart', cartRouter)
app.use(orderRouter)
app.use('/admin', adminRouter)

app.get('/error', (req, res) => {
  res.status(500)
  res.render('error.ejs', {
    isUser: req.session.userId,
    isAdmin: req.session.isAdmin,
    pageTitle: 'Error',
  })
})

app.get('/not-admin', (req, res) => {
  res.status(403)
  res.render('not-admin', {
    isUser: req.session.userId,
    isAdmin: false,
    pageTitle: 'Not Allowed',
  })
})

app.use((req, res) => {
  res.status(404)
  res.render('not-found', {
    isUser: req.session.userId,
    isAdmin: req.session.isAdmin,
    pageTitle: 'Page Not Found',
  })
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`)
})
