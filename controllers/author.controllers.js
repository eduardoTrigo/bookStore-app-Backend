const Author = require("../models/Author")

const getAuthors = async (req, res, next )=>{
    try {
        const {id} = req.params
        let query = undefined
        if (id != undefined) {
            query = Author.findById(id)
        } else {
            query = Author.find({})
        }
        const response = await query.exec()
        if(!response) return res.status(404).json({message: "Author not found"})
        res.status(200)
        res.json(response)
    } catch (error) {
        next(error)
    }
}

const createAuthor = async (req, res, next) => {
    try {
        const {firstName, lastName} = req.body
        const author = new Author({ firstName, lastName})
        await author.save()
        res.status(201)
        res.json(author)
    } catch (error) {
        next(error)
    }
}

const deleteAuthor = async (req, res, next) => {
    try {
        const {id} = req.params
        const author = await Author.findByIdAndDelete(id)
        if (!author) return res.status(404).json({message: "autor inexistente"})
        res.status(201)
        res.json(author)    
    } catch (error) {
        next(error)
    }
}

const updateAuthor = async (req, res, next)=>{
    try {
        const {id}= req.params
        const {firstName, lastName}= req.body
        const author = await Author.findByIdAndUpdate(id,{firstName, lastName},{new: true})
        if (!author) return res.status(404).json({ message: "Author not found" })
        res.status(201)
        res.json(author)
    } catch (error) {
        next(error)
    }
}

module.exports= {
    getAuthors,
    createAuthor,
    deleteAuthor,
    updateAuthor
}