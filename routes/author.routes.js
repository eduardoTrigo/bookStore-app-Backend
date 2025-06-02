const { getAuthors, updateAuthor, deleteAuthor, createAuthor } = require('../controllers/author.controllers')

const authorRouter = require('express').Router()

authorRouter.get('/', getAuthors)
authorRouter.get('/:id',getAuthors)
authorRouter.post('/', createAuthor)
authorRouter.patch('/:id', updateAuthor)
authorRouter.delete('/id', deleteAuthor)

module.exports = authorRouter