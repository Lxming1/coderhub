const { create, reply, del, list } = require('../service/comment.service')
const { successMes, successBody } = require('../utils/success-body')

class Comment {
  async create(ctx) {
    const { content, momentId } = ctx.request.body
    const userId = ctx.user.id
    await create(content, momentId, userId)
    ctx.body = successMes('Comment Success')
  }

  async reply(ctx) {
    const { content, momentId } = ctx.request.body
    const { commentId } = ctx.params
    const userId = ctx.user.id
    await reply(content, momentId, userId, commentId)
    ctx.body = successMes('Reply Success')
  }

  async del(ctx) {
    const { commentId } = ctx.params
    await del(commentId)
    ctx.body = successMes('Delete Success')
  }

  async list(ctx) {
    const { momentId } = ctx.query
    if (!momentId) {
      const err = new Error()
      return ctx.app.emit('error', err, ctx)
    }

    const result = await list(momentId)

    const resp = {
      total: result.length,
      comments: result,
    }
    ctx.body = successBody(resp)
  }
}

module.exports = new Comment()
