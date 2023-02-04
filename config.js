import dotenv from 'dotenv'

dotenv.config()

const { port } = process.env

export default {
  port: port,
}
