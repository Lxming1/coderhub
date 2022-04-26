const {
  USERNAME_OR_PASSWORD_IS_REQUIRED,
  USERNAME_ALREADY_EXIST,
  USERNAME_DOSE_NOT_EXIST,
  PASSORD_ERROR,
  UNAUTHORIZATION,
  UNPERMISSION,
} = require('../constants/error-types')

const errorHandle = (err, ctx) => {
  let status, errMessage

  switch (err.message) {
    case USERNAME_OR_PASSWORD_IS_REQUIRED:
      errMessage = USERNAME_OR_PASSWORD_IS_REQUIRED
      status = 400 //Bad request
      break
    case USERNAME_ALREADY_EXIST:
      errMessage = USERNAME_ALREADY_EXIST
      status = 409 //conflict
      break
    case USERNAME_DOSE_NOT_EXIST:
      errMessage = USERNAME_DOSE_NOT_EXIST
      status = 400 //Bad request
      break
    case PASSORD_ERROR:
      errMessage = PASSORD_ERROR
      status = 401
      break
    case UNAUTHORIZATION:
      errMessage = UNAUTHORIZATION
      status = 403
      break
    case UNPERMISSION:
      errMessage = UNPERMISSION
      status = 401
      break
    default:
      errMessage = 'Not Found'
      status = 500
  }

  ctx.status = status
  ctx.body = {
    status,
    message: errMessage,
  }
}

module.exports = errorHandle
