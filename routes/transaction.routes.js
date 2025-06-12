const { getNewstedOrder, addProductToOrder, buyOrder, getOrder, deleteProductByOrder } = require('../controllers/transactions.controllers')
const { authRequired } = require('../middlewares/validateToken.middleware')

const transactionsRouter = require('express').Router()

transactionsRouter.get('/myOrder', authRequired, getNewstedOrder)
transactionsRouter.get('/orders', authRequired, getOrder)
transactionsRouter.post('/order', authRequired, addProductToOrder)
transactionsRouter.delete('/order',authRequired, deleteProductByOrder)
transactionsRouter.patch('/buyOrder', authRequired, buyOrder)

module.exports = transactionsRouter