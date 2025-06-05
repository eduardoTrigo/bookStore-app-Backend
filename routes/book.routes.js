const { getBooks, createBook, updateBook, deleteBook } = require('../controllers/books.controllers')
const { validateMongoId } = require('../middlewares/common.middleware')
// const {errorMiddleware} = require('../middlewares/common.middleware')
const validateSchema = require('../middlewares/validator.middleware')
const {validateDataBook, updateBookSchema} = require('../schemas/book.schema')

const bookRouter = require('express').Router()

bookRouter.get('/', getBooks)
bookRouter.get('/:id',validateMongoId, getBooks)
bookRouter.post('/',validateSchema(validateDataBook), createBook)
bookRouter.patch('/:id',validateMongoId,validateSchema(updateBookSchema), updateBook)
bookRouter.delete('/:id',validateMongoId, deleteBook)

module.exports = bookRouter