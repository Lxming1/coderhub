const errorTypes = require('../constants/error-types')
const { verityUP } = require('../service/auth.service')
const { md5handle } = require('../utils/handle-password')

const verityLogin = async (ctx, next) => {
  const user = ctx.request.body

  // 判断用户名或密码是否为空
  if (!user.username || !user.password) {
    const err = new Error(errorTypes.USERNAME_OR_PASSWORD_IS_REQUIRED)
    return ctx.app.emit('error', err, ctx)
  }

  // 判断用户是否存在
  let result = (await verityUP(user))[0]
  if (!result) {
    const err = new Error(errorTypes.USERNAME_DOSE_NOT_EXIST)
    return ctx.app.emit('error', err, ctx)
  }

  //判断密码是否正确
  if (result.password !== md5handle(user.password)) {
    const err = new Error(errorTypes.USERNAME_OR_PASSORD_ERROR)
    return ctx.app.emit('error', err, ctx)
  }
  await next()
}

module.exports = {
  verityLogin,
}
