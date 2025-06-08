const bcrypt = require('bcrypt')
const { User } = require('../models/User')
const createAccerrToken = require('../libs/jwt')

const register = async( req, res, next) => {
    const { userName, email, password } = req.body
    try {
        const passwordHash = await bcrypt.hash(password, 5)

        const newUser = new User({
            userName,
            email,
            password: passwordHash
        })

        const user = await newUser.save()

        const token = await createAccerrToken({id: user._id})

        res.cookie("token", token)

        res.json({
            id: user._id,
            userName: user.userName,
            email: user.email
        })
    } catch (error) {
        next(error)
    }
}

const login = async (req, res) => {
    const { email, password } = req.body
    try {
        const user = await User.findOne({email})
        if(!user) return res.status(400).json({message: "user not found"})

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) return res.status(400).json({message: "incorrect Password"})

        const token = await createAccerrToken({id: user._id})

        res.cookie("token", token)

        res.json({
            id: user._id,
            userName: user.userName,
            email: user.email
        })
    } catch (error) {
        next(error)
    }
}

module.exports = {
    register,
    login
}