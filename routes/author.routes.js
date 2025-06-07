const { getAuthors, updateAuthor, deleteAuthor, createAuthor } = require('../controllers/author.controllers')
const { validateMongoId } = require('../middlewares/common.middleware')
const validateSchema = require('../middlewares/validator.middleware')
const { validateDataAuthor, updateDataAuthor } = require('../schemas/author.schema')

const authorRouter = require('express').Router()

authorRouter.get('/', getAuthors)
authorRouter.get('/:id',validateMongoId, getAuthors)
authorRouter.post('/',validateSchema(validateDataAuthor), createAuthor)
authorRouter.patch('/:id',validateMongoId,validateSchema(updateDataAuthor), updateAuthor)
authorRouter.delete('/:id',validateMongoId, deleteAuthor)

module.exports = authorRouter