const errorTypes = require('../constants/error-types')
const { getUsername } = require('../service/user.service')

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
  const result = await getUsername(username)
  console.log(result)

  if (result.length !== 0) {
    const err = new Error(errorTypes.USERNAME_ALREADY_EXIST)
    return ctx.app.emit('error', err, ctx)
  }
  await next()
}

module.exports = {
  verifyUser,
}
