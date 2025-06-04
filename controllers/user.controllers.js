const { User } = require("../models/User")

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
        res.status(200)
        res.json(response)
    } catch (error) {
        next(error)
    }
}

const createUser = async( req, res, next)=>{
    try {
        const {userName , email, password, role} = req.body
        const user = new User({userName, email, password, role})
        await user.save()
        res.status(201)
        res.json(user)
    } catch (error) {
        next(error)
    }
}

const updateUser = async( req, res, next)=>{
    try {
        const { id } = req.params
        const {userName, email, password, role} = req.body
        const user = await User.findByIdAndUpdate(id, { userName, email, password, role},{new: true})
        if(!user) return res.status(404).json('user not found')
        
        res.status(201)
        res.json(user)
    } catch (error) {
        next(error)
    }
}

const deleteUser = async (req, res, next)=>{
    try {
        const { id } = req.params
        const user = await User.findByIdAndDelete(id)
        if(!user) return res.status(404).json('user not found')
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