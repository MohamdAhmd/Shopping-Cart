const dotenv = require('dotenv')

dotenv.config()

const { port, DB_URL } = process.env

module.exports = {
  port: port,
  DB_URL: DB_URL,
}
