const jwt = require('jsonwebtoken')
const { PUBLIC_KEY } = require('../app/config')

const errorTypes = require('../constants/error-types')
const { verifyUP } = require('../service/auth.service')
const { md5handle } = require('../utils/handle-password')

const verifyLogin = async (ctx, next) => {
  const user = ctx.request.body

  // 判断用户名或密码是否为空
  if (!user.username || !user.password) {
    const err = new Error(errorTypes.USERNAME_OR_PASSWORD_IS_REQUIRED)
    return ctx.app.emit('error', err, ctx)
  }

  // 判断用户是否存在
  let result = (await verifyUP(user))[0]
  if (!result) {
    const err = new Error(errorTypes.USERNAME_DOSE_NOT_EXIST)
    return ctx.app.emit('error', err, ctx)
  }

  //判断密码是否正确
  if (result.password !== md5handle(user.password)) {
    const err = new Error(errorTypes.PASSORD_ERROR)
    return ctx.app.emit('error', err, ctx)
  }

  ctx.user = result
  await next()
}

const verifyAuth = async (ctx, next) => {
  const authorization = ctx.headers.authorization
  if (!authorization) {
    const err = new Error(errorTypes.UNAUTHORIZATION)
    return ctx.app.emit('error', err, ctx)
  }
  const token = authorization.replace('Bearer ', '')
  try {
    const result = jwt.verify(token, PUBLIC_KEY, {
      algorithms: ['RS256'],
    })
    ctx.user = result
  } catch (error) {
    console.log(error)
    const err = new Error(errorTypes.UNAUTHORIZATION)
    return ctx.app.emit('error', err, ctx)
  }
  await next()
}

module.exports = {
  verifyLogin,
  verifyAuth,
}
