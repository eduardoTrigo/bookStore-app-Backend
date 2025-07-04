const { default: mongoose } = require("mongoose")
const { errorResponse } = require("../utils/response")

// module.exports = errorHandler
const errorMiddleware = (err, req, res, next) => {
  console.error('🧨 Error capturado:', err)

  // Verifica si es un error de clave duplicada (MongoDB)
  if (err.code === 11000 && err.keyPattern) {
    const field = Object.keys(err.keyPattern)[0]
    return errorResponse(res, new Error(`${field} ya existe`), 400)
  }

  console.log(err)
  // Otro tipo de error
  return errorResponse(res, err, 500)
}

const validateMongoId = (req, res, next) => {
  const { id } = req.params
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'Invalid ID format' })
  }
  next()
}

module.exports = { errorMiddleware, validateMongoId }