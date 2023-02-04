const express = require('express')
const path = require('path')
const app = express()

app.use(express.static(path.join(__dirname, 'public')))
app.set('views', 'views')
app.set('view engine', 'ejs')

app.get('/', (req, res) => {
  res.send('hello world')
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`)
})
