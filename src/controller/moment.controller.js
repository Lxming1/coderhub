const { create, detail, list, del, update } = require('../service/moment.service')
const { successBody, successMes } = require('../utils/success-body')

class Moment {
  async create(ctx, next) {
    const userId = ctx.user.id
    const { content } = ctx.request.body

    await create(userId, content)

    ctx.body = successMes('Create Moment Success')
  }

  // 查询一条动态
  async detail(ctx, next) {
    const momentId = ctx.params.momentId

    const result = await detail(momentId)

    ctx.body = successBody(result)
  }

  // 查询多条动态
  async list(ctx, next) {
    const { pagenum, pagesize } = ctx.query
    let result = null

    try {
      result = await list(pagesize, pagenum)
    } catch (error) {
      // 捕获参数错误导致报错
      const err = new Error()
      return ctx.app.emit('error', err, ctx)
    }

    ctx.body = {
      status: 200,
      message: 'Success',
      data: {
        total: result.length,
        list: result,
      },
    }
  }

  // 修改动态
  async update(ctx, next) {
    const momentId = ctx.params.momentId
    const content = ctx.request.body.content

    await update(momentId, content)

    ctx.body = successMes('Update Success')
  }

  // 删除动态
  async del(ctx, next) {
    const momentId = ctx.params.momentId

    await del(momentId)

    ctx.body = successMes('Delete Success')
  }
}

module.exports = new Moment()
