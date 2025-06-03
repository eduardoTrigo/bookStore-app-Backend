const { getBooks, createBook, updateBook, deleteBook } = require('../controllers/books.controllers')

const bookRouter = require('express').Router()

bookRouter.get('/', getBooks)
bookRouter.get('/:id', getBooks)
bookRouter.post('/', createBook)
bookRouter.patch('/:id', updateBook)
bookRouter.delete('/:id', deleteBook)

module.exports = bookRouter