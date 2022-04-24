const errorTypes = require('../constants/error-types')
const { verifyName } = require('../service/user.service')
const { md5handle } = require('../utils/handle-password')

// 验证用户名密码
const verifyUser = async (ctx, next) => {
  // 抽取数据
  const { username, password } = ctx.request.body

  // 判断用户名密码是否为空
  if (!username || !password) {
    const err = new Error(errorTypes.USERNAME_OR_PASSWORD_IS_REQUIRED)
    return ctx.app.emit('error', err, ctx)
  }

  // 判断用户名是否已存在
  const result = await verifyName(username)

  if (result.length !== 0) {
    const err = new Error(errorTypes.USERNAME_ALREADY_EXIST)
    return ctx.app.emit('error', err, ctx)
  }
  await next()
}

// 加密密码
const handlePassword = async (ctx, next) => {
  const { password } = ctx.request.body
  ctx.request.body.password = md5handle(password)

  await next()
}

module.exports = {
  verifyUser,
  handlePassword,
}
