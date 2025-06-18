const { Books } = require("../models/Books")
const { successResponse, errorResponse } = require("../utils/response")

const getBooks = async (req, res, next) => {
    try {
        const { id } = req.params
        let query = undefined
        if (id != undefined) {
            query = Books.findById(id)
        } else {
            query = Books.find({})
        }
        const response = await query.exec()
        if(!response) return errorResponse(res,"Book not found",404)
        return successResponse(res, response, id ? "Book obtenido": "listado de books")
    } catch (error) {
        next(error)
    }
}

const createBook = async (req, res, next) => {
    try {
        const { title, description, authorId, price, stock, available } = req.body
        const book = new Books({ title, description, authorId, price, stock, available })
        await book.save()

        return successResponse(res,book,"book creado correctamente",201)
    } catch (error) {
        next(error)
    }
}

const updateBook = async (req, res, next) => {
    try {
        const { id } = req.params
        const { title, description, authorId, price, stock, available } = req.body
        const book = await Books.findByIdAndUpdate(id, { title, description, authorId, price, stock, available }, { new: true })
        if (!book) return errorResponse(res,"Book not found",404)

        return successResponse(res,book,"book actualizado correctamente")
    } catch (error) {
        next(error)
    }
}

const deleteBook = async (req, res, next) => {
    try {
        const { id } = req.params
        const book = await Books.findByIdAndDelete(id)
        if (!book) return errorResponse(res,"Book not found",404)

        return successResponse(res, [], "book eleminado correctamente")
    } catch (error) {
        next(error)
    }
}

module.exports = {
    getBooks,
    createBook,
    updateBook,
    deleteBook
}