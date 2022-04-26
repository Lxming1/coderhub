const {
  UNPERMISSION,
  QUERY_KEY_ERROR,
  QUERY_VALUE_ERROR,
  PARAMS_VALUE_ERROR,
} = require('../constants/error-types')
const { checkResource } = require('../service/auth.service')

// const verifyPermission = async (ctx, next) => {
//   const momentId = ctx.params.momentId
//   // 不存在momentId
//   if (!momentId) {
//     const err = new Error(QUERY_KEY_ERROR)
//     return ctx.app.emit('error', err, ctx)
//   }

//   const result = await checkResource('moment', momentId)
//   // 找不到对应id的评论
//   if (!result.length) {
//     const err = new Error(PARAMS_VALUE_ERROR)
//     return ctx.app.emit('error', err, ctx)
//   }

//   const userId = result[0].userId
//   // 不是本人修改
//   if (ctx.user.id !== userId) {
//     const err = new Error(UNPERMISSION)
//     return ctx.app.emit('error', err, ctx)
//   }
//   await next()
// }

// const verifyQuery = async (ctx, next) => {
//   const { pagenum, pagesize } = ctx.query
//   if (!pagenum || !pagesize) {
//     const err = new Error(QUERY_KEY_ERROR)
//     return ctx.app.emit('error', err, ctx)
//   }
//   if (parseInt(pagesize) < 0 || parseInt(pagenum) <= 0) {
//     const err = new Error(QUERY_VALUE_ERROR)
//     return ctx.app.emit('error', err, ctx)
//   }
//   await next()
// }

module.exports = {
  // verifyQuery,
}
