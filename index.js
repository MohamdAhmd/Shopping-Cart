const express = require('express')
const path = require('path')
const homeRouter = require('./routes/home.route')
const productRouter = require('./routes/product.route')
const app = express()

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.static(path.join(__dirname, 'images')))
app.set('views', 'views')
app.set('view engine', 'ejs')

app.use(homeRouter)
app.use('/product', productRouter)

app.get('/', (req, res) => {
  res.render('index')
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`)
})
