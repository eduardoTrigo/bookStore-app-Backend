const { getNewstedOrder, addProductToOrder, buyOrder } = require('../controllers/transactions.controllers')
const { authRequired } = require('../middlewares/validateToken.middleware')

const transactionsRouter = require('express').Router()

transactionsRouter.get('/myOrder',authRequired, getNewstedOrder)
transactionsRouter.post('/order', authRequired, addProductToOrder)
transactionsRouter.patch('/buyOrder', authRequired, buyOrder)

module.exports = transactionsRouter