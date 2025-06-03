const { Books } = require("../models/Books")

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
        res.status(200)
        req.json(response)
    } catch (error) {
        next(error)
    }
}

const createBook = async (req, res, next) => {
    try {
        const { title, description, authorId } = req.body
        const book = new Books({ title, description, authorId })
        await book.save()

        res.status(201)
        res.json(book)
    } catch (error) {
        next(error)
    }
}

const updateBook = async (req, res, next) => {
    try {
        const { id } = req.params
        const { title, description, authorId } = req.body
        const book = await Books.findByIdAndUpdate(id, { title, description, authorId }, { new: true })

        res.status(201)
        res.json(book)
    } catch (error) {
        next(error)
    }
}

const deleteBook = async (req, res, next) => {
    try {
        const { id } = req.params
        const book = await Books.findByIdAndDelete(id)
        res.status(201)
        res.json(book)
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