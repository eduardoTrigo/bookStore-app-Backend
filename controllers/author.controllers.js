const Author = require("../models/Author")
const { errorResponse, successResponse } = require("../utils/response")

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
        if(!response) return errorResponse(res, "Author not found", 404)
        
        return successResponse(res,response,id ? "Autor Obtenido": "Listado de Autores",200)
    } catch (error) {
        next(error)
    }
}

const createAuthor = async (req, res, next) => {
    try {
        const {firstName, lastName} = req.body
        const author = new Author({ firstName, lastName})
        await author.save()
        return successResponse(res, author , "autor creado correctamente ",201)
    } catch (error) {
        next(error)
    }
}

const deleteAuthor = async (req, res, next) => {
    try {
        const {id} = req.params
        const author = await Author.findByIdAndDelete(id)
        if (!author) return errorResponse(res, "autor inexistente", 404)
        
        return successResponse(res, author, "autor inexistente")
    } catch (error) {
        next(error)
    }
}

const updateAuthor = async (req, res, next)=>{
    try {
        const {id}= req.params
        const {firstName, lastName}= req.body
        const author = await Author.findByIdAndUpdate(id,{firstName, lastName},{new: true})
        if (!author) return errorResponse(res, "Author not found", 404)
        return successResponse(res, author, "Informacion de Autor actualizada correctamente")
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