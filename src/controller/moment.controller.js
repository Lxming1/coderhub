const {
  NUM_AND_SIZE_NOT_EXIST,
  QUERY_ERROR,
  NOT_FOUND_MOMENTID,
} = require('../constants/error-types')
const { create, detail, list, del } = require('../service/moment.service')
const { successBody, successMes } = require('../utils/success-body')

class Moment {
  async create(ctx, next) {
    const userId = ctx.user.id
    const { content } = ctx.request.body
    // 参数错误抛出错误
    if (!content) {
      const err = new Error()
      return ctx.app.emit('error', err, ctx)
    }
    await create({ userId, content })

    ctx.body = successMes('Create Moment Success')
  }

  async detail(ctx, next) {
    const momentId = ctx.params.momentId
    const result = (await detail(momentId))[0]
    // 没有找到对应动态抛出错误
    if (!result) {
      const err = new Error(NOT_FOUND_MOMENTID)
      return ctx.app.emit('error', err, ctx)
    }
    ctx.body = successBody(result)
  }

  async list(ctx, next) {
    const { pagenum, pagesize } = ctx.query
    if (!pagenum || !pagesize) {
      const err = new Error(NUM_AND_SIZE_NOT_EXIST)
      return ctx.app.emit('error', err, ctx)
    }
    if (parseInt(pagesize) < 0 || parseInt(pagenum) <= 0) {
      const err = new Error(QUERY_ERROR)
      return ctx.app.emit('error', err, ctx)
    }
    const result = await list({ pagenum, pagesize })
    ctx.body = successBody(result)
  }

  async del(ctx, next) {
    const momentId = ctx.params.momentId
    const result = await del(momentId)
    // 没有找到对应动态抛出错误
    if (!result.affectedRows) {
      const err = new Error()
      return ctx.app.emit('error', err, ctx)
    }
    ctx.body = successMes('Delete Success')
  }
}

module.exports = new Moment()
