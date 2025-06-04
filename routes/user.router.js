const { getUser, createUser, updateUser, deleteUser } = require('../controllers/user.controllers.js')

const userRouter = require('express').Router()

userRouter.get('/', getUser)
userRouter.get('/:id', getUser)
userRouter.post('/', createUser)
userRouter.patch('/:id', updateUser)
userRouter.delete('/:id',deleteUser)

module.exports = userRouter