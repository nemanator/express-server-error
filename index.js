class ServerError extends Error {
  constructor (message = 'Internal Server Error.', { status = 500, name = 'ServerError', log = true } = {}) {
    super(message)
    this.name = name
    this.status = status
    this.log = log
    this.expressServerError = true
  }
}

let handleServerErrors = customErrors => (req, res, next) => {
  res.handleServerError = error => {
    if (error.expressServerError) {
      if (error.log === true) console.error(error)
      res.status(error.status).json({ name: error.name, message: error.message })
    } else if (error.name in customErrors) {
      let customError = customErrors[error.name](error)
      if (customError.log === true) console.error(error)
      let name = customError.name !== 'ServerError' ? customError.name : error.name
      res.status(customError.status).json({ name, message: customError.message })
    } else {
      error.expressServerError = false
      console.error(error)
      res.status(500).json({ name: 'ServerError', message: 'Internal Server Error.' })
    }
  }
  next()
}

module.exports = { ServerError, handleServerErrors }