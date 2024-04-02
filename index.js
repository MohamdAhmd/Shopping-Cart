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
    cookie: {
      maxAge: 60 * 60 * 100, // in milliseconds
    },
    store: STORE,
  })
)
app.set('views', 'views')
app.set('view engine', 'ejs')

app.use(userRouter)
app.use('/', homeRouter)
app.use('/product', productRouter)
app.use('/cart', cartRouter)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`)
})
