const jwt = require("jsonwebtoken");
const { JWT_CONFIG } = require("../config");

const authRequired = (req, res, next) => {
    const token = req.cookies.token
    if (!token) {
        return res.status(401).json({ message: "No token, authorization deneid" })
    }

    jwt.verify(token, JWT_CONFIG.TOKEN_SECRET, (err, user) => {
        if (err) return res.status(403).json({ message: "Invalid token" })

        req.user = user

        next()
    })
}

const isGuest = (req, res, next) => {
    const token = req.cookies.token

    if (!token) return next()

    jwt.verify(token, JWT_CONFIG.TOKEN_SECRET, (err, user) => {
        if (err) { return next() }

        return res.status(400).json({message:"el usuario ya esta logueado"})
    })
}

module.exports = { authRequired, isGuest }