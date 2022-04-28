const { create, list, getMomentLabel } = require('../service/label.service')
const { successBody } = require('../utils/success-body')

class Label {
  async create(ctx) {
    const { name } = ctx.request.body
    const result = await create(name)
    ctx.body = successBody(result)
  }

  async list(ctx, next) {
    const { pagesize, pagenum } = ctx.query

    // 如果没有这两个参数，说明查询的是动态的标签
    if (!pagesize && !pagenum) {
      return await next()
    }

    let result = null

    try {
      result = await list(pagesize, pagenum)
    } catch (error) {
      const err = new Error()
      return ctx.app.emit('error', err, ctx)
    }

    ctx.body = successBody({
      total: result.length,
      labels: result,
    })
  }

  async momentLabel(ctx) {
    const { momentId } = ctx.query
    const result = await getMomentLabel(momentId)
    const labels = result[0].labels || []
    ctx.body = successBody({
      total: labels.length,
      labels,
    })
  }
}

module.exports = new Label()
