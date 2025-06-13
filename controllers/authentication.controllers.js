const bcrypt = require('bcrypt')
const { User } = require('../models/User')
const createAccerrToken = require('../libs/jwt')
const { successResponse, errorResponse } = require('../utils/response')

const register = async (req, res, next) => {
    const { userName, email, password } = req.body
    try {
        const passwordHash = await bcrypt.hash(password, 5)

        const newUser = new User({
            userName,
            email,
            password: passwordHash
        })

        const user = await newUser.save()

        const token = await createAccerrToken({ id: user._id })

        res.cookie("token", token, {
            httpOnly: true,        // Impide acceso desde JavaScript
            // secure: true,          // Solo se transmite por HTTPS (ideal en producción)
            // sameSite: "strict"     // Evita que se envíe desde otros dominios (protección CSRF)
          })

        return successResponse(res,
            {
            id: user._id,
            userName: user.userName,
            email: user.email
            },"resgistro Exitoso",201)
    } catch (error) {
        next(error)
    }
}

const login = async (req, res) => {
    const { email, password } = req.body
    try {
        const user = await User.findOne({ email })
        if (!user) return errorResponse(res,"user not found",404)

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) return errorResponse(res,"incorrect Password",400)

        const token = await createAccerrToken({ id: user._id })

        res.cookie("token", token,{
            httpOnly: true,        // Impide acceso desde JavaScript
            // secure: true,          // Solo se transmite por HTTPS (ideal en producción)
            // sameSite: "strict"     // Evita que se envíe desde otros dominios (protección CSRF)
          }
        )

        return successResponse(res,
            {
            id: user._id,
            userName: user.userName,
            email: user.email
            },"Login Exitoso")
    } catch (error) {
        next(error)
    }
}

const logout = async (req, res, next) => {
    try {
        res.cookie('token', "", { expires: new Date(0) , httpOnly: true}, )
        return successResponse(res,[],"Sesión cerrada correctamente")
    } catch (error) {
        next(error)
    }
}

const myProfile = async (req, res) => {
    try {
        console.log(req.user)
        const userFound = await User.findById(req.user.id)
        if (!userFound) return errorResponse(res,"user not found",404)
        
        return successResponse(res,{
            id: userFound.id,
            username: userFound.userName,
            email: userFound.email
            },"My Profile obtenido correctamente")
    } catch (error) {
        next(error)
    }
}

module.exports = {
    register,
    login,
    logout,
    myProfile
}