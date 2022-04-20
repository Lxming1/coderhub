const errorTypes = require('../constants/error-types')

const errorHandle = (err, ctx) => {
  let status, errMessage

  switch (err.message) {
    case errorTypes.USERNAME_OR_PASSWORD_IS_REQUIRED:
      errMessage = errorTypes.USERNAME_OR_PASSWORD_IS_REQUIRED
      status = 400
      break
    case errorTypes.USERNAME_ALREADY_EXIST:
      errMessage = errorTypes.USERNAME_ALREADY_EXIST
      status = 409
      break
    default:
      errMessage = errorTypes.NOT_FOUND
      status = 500
  }

  ctx.status = status
  ctx.body = errMessage
}

module.exports = errorHandle
