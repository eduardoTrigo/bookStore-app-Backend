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
        if(!response) return res.status(404).json({message: "Book not found"})
        res.status(200)
        res.json(response)
    } catch (error) {
        next(error)
    }
}

const createBook = async (req, res, next) => {
    try {
        const { title, description, authorId, price, stock, available } = req.body
        const book = new Books({ title, description, authorId, price, stock, available })
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
        const { title, description, authorId, price, stock, available } = req.body
        const book = await Books.findByIdAndUpdate(id, { title, description, authorId, price, stock, available }, { new: true })
        if (!book) return res.status(404).json({message: " book not found"})

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
        if (!book) return res.status(404).json({message: " book not found"})

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