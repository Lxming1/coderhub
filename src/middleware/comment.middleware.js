const {
  QUERY_KEY_ERROR,
  QUERY_VALUE_ERROR,
  PARAMS_VALUE_ERROR,
  UNPERMISSION,
} = require('../constants/error-types')
const { checkResource } = require('../service/auth.service')
const service = require('../service/comment.service')

// const verifyQuery = async (ctx, next) => {
//   const { content, momentId } = ctx.request.body
//   const { commentId } = ctx.params

//   // 判断body参数是否存在
//   if (!content || !momentId) {
//     const err = new Error(QUERY_KEY_ERROR)
//     return ctx.app.emit('error', err, ctx)
//   }

//   const result = await checkResource('moment', momentId)
//   // 判断动态是否存在
//   if (!result.length) {
//     const err = new Error(QUERY_VALUE_ERROR)
//     return ctx.app.emit('error', err, ctx)
//   }

//   // 回复评论时，判断commentId是否存在
//   if (commentId) {
//     const isExistId = await checkResource('comment', commentId)
//     if (!isExistId.length) {
//       const err = new Error(PARAMS_VALUE_ERROR)
//       return ctx.app.emit('error', err, ctx)
//     }
//   }

//   await next()
// }

// const verifyPermission = async (ctx, next) => {
//   const { commentId } = ctx.params
//   const userId = ctx.user.id

//   const comment = await checkResource('comment', commentId)
//   // 判断该评论是否存在
//   if (!comment.length) {
//     const err = new Error(PARAMS_VALUE_ERROR)
//     return ctx.app.emit('error', err, ctx)
//   }

//   // 不是本人
//   if (comment[0].userId !== userId) {
//     const err = new Error(UNPERMISSION)
//     return ctx.app.emit('error', err, ctx)
//   }

//   await next()
// }
const verifyReply = async (ctx, next) => {
  const { momentId } = ctx.request.body
  const { commentId } = ctx.params

  // 验证该动态是否有这条评论
  const result = await service.verifyReply(momentId, commentId)

  if (!result.length) {
    const err = new Error()
    return ctx.app.emit('error', err, ctx)
  }

  await next()
}

module.exports = {
  // verifyQuery,
  // verifyPermission,
  verifyReply,
}
