const dotEnv = require('dotenv')

dotEnv.config()

const MONGO_CONFIG = {
    URI: process.env.MONGO_URI
}

const EXPRESS_CONFIG = {
    PORT: process.env.PORT
}

module.exports = {
    MONGO_CONFIG,
    EXPRESS_CONFIG
}