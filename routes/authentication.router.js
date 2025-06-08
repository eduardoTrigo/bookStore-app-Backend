const { register, login, logout, myProfile } = require('../controllers/authentication.controllers')
const {authRequired, isGuest} = require('../middlewares/validateToken.middleware')
const validateSchema = require('../middlewares/validator.middleware')
const { registerSchema, loginSchema } = require('../schemas/auhentication.schema')

const authenticationRouter = require('express').Router()

authenticationRouter.post('/register', validateSchema(registerSchema),register)
authenticationRouter.post('/login',isGuest, validateSchema(loginSchema), login)
authenticationRouter.post('/logout',authRequired, logout)
authenticationRouter.get('/myProfile', authRequired, myProfile)

module.exports = authenticationRouter