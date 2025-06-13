const successResponse = (res, data, message = 'Operación exitosa', code = 200) => {
    return res.status(code).json({
      success: true,
      message,
      data
    })
  }
  
  const errorResponse = (res, error, code = 500) => {
    return res.status(code).json({
      success: false,
      error: error?.stack || error
    })
  }
  
  module.exports = { successResponse, errorResponse }