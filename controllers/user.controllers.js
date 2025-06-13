const { User } = require("../models/User")
const { successResponse, errorResponse } = require("../utils/response")

const getUser = async (req, res, next)=>{
    try {
        const {id} = req.params
        let query = undefined
        if (id != undefined) {
            query = User.findById(id)
        } else {
            query = User.find({})
        }
        const response = await query.exec()
        return successResponse(res,response,id ? "Usuario Obtenido": "Listado de usuarios")
    } catch (error) {
        next(error)
    }
}

const createUser = async( req, res, next)=>{
    try {
        const {userName , email, password, role} = req.body
        const user = new User({userName, email, password, role})
        await user.save()
        return successResponse(res, user, "Usuario Creado Correctamente",201)
    } catch (error) {
        next(error)
    }
}

const updateUser = async( req, res, next)=>{
    try {
        const { id } = req.params
        const {userName, email, password, role} = req.body
        const user = await User.findByIdAndUpdate(id, { userName, email, password, role},{new: true})
        if(!user) return errorResponse(res,"user not found",404)
        
        return successResponse(res,user, "Usuario Actualizado Correctamente")
    } catch (error) {
        next(error)
    }
}

const deleteUser = async (req, res, next)=>{
    try {
        const { id } = req.params
        const user = await User.findByIdAndDelete(id)
        if(!user) return errorResponse(res,"user not found",404)
        res.status(201)
        res.json(user)
    } catch (error) {
        next(error)
    }
}

module.exports = {
    getUser,
    createUser,
    updateUser,
    deleteUser
}