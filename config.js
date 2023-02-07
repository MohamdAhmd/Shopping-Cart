const dotenv = require('dotenv')

dotenv.config()

const { port, DB_URL_test, SALT_PASSWORD } = process.env

module.exports = {
  port: port,
  DB_URL: DB_URL_test,
  SALT_PASSWORD: SALT_PASSWORD,
}
