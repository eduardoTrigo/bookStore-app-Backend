const { register, login } = require('../controllers/authentication.controllers')

const authenticationRouter = require('express').Router()

authenticationRouter.post('/',register)
authenticationRouter.post('/', login)

module.exports = authenticationRouter