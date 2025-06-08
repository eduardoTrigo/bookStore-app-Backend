const { JWT_CONFIG } = require('../config')
const jwt = require('jsonwebtoken')

function createAccerrToken(payload){
    return new Promise((resolve, reject)=>{
        jwt.sign(
            payload,
            JWT_CONFIG.TOKEN_SECRET,
            {
                expiresIn: "1d"
            },
            (err, token)=>{
                if(err) reject(err)
                resolve(token)
            }
        )
    })
}

module.exports = createAccerrToken