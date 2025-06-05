const { default: mongoose } = require("mongoose")

// module.exports = errorHandler
const errorMiddleware = (err, req, res, next) => {
  console.error('🧨 Error capturado:', err)

  // Verifica si es un error de clave duplicada (MongoDB)
  if (err.code === 11000 && err.keyPattern) {
    const field = Object.keys(err.keyPattern)[0]
    return res.status(400).json({ error: `${field} already exists` })
  }

  // Otro tipo de error
  return res.status(500).json({
    error: 'Internal server error',
    message: err.message,
  })
}

const validateMongoId = (req, res, next) => {
  const {id} = req.params
  if(!mongoose.Types.ObjectId.isValid(id)){
    return res.status(400).json({error: 'Invalid ID format'})
  }
  next()
}

module.exports = {errorMiddleware , validateMongoId}