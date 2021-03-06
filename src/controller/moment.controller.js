const fs = require('fs')
const { PICTURE_PATH } = require('../constants/file-types')
const {
  create,
  detail,
  list,
  del,
  update,
  addLabels,
  hasLabel,
  getPicInfo,
} = require('../service/moment.service')
const { successBody } = require('../utils/success-body')

class Moment {
  async create(ctx, next) {
    const userId = ctx.user.id
    const { content } = ctx.request.body

    const result = await create(userId, content)

    ctx.body = successBody(result)
  }

  // 查询一条动态
  async detail(ctx, next) {
    const { momentId } = ctx.params

    const result = await detail(momentId)

    ctx.body = successBody(result[0])
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
    ctx.body = successBody({
      total: result.length,
      moments: result,
    })
  }

  // 修改动态
  async update(ctx, next) {
    const { momentId } = ctx.params
    const { content } = ctx.request.body

    const result = await update(momentId, content)

    ctx.body = successBody(result)
  }

  // 删除动态
  async del(ctx, next) {
    const { momentId } = ctx.params

    const result = await del(momentId)

    ctx.body = successBody(result)
  }

  async addLabels(ctx) {
    const { labels } = ctx
    const { momentId } = ctx.params
    const respBody = []
    for (let item of labels) {
      const isExist = await hasLabel(item.id, momentId)
      // 如果没有给动态加此标签才加
      if (!isExist) {
        await addLabels(item.id, momentId)
      }
      respBody.push(item)
    }
    ctx.body = successBody(respBody)
  }

  async showPicture(ctx) {
    try {
      let { filename } = ctx.params
      const { type } = ctx.query
      const types = ['large', 'middle', 'small']
      if (type) {
        if (types.some((item) => item === type)) {
          filename = filename + '-' + type
        } else throw new Error()
      }
      try {
        const result = await getPicInfo(filename)

        ctx.response.set('content-type', result[0].mimetype)
        ctx.body = fs.createReadStream(`${PICTURE_PATH}/${filename}`)
      } catch (error) {
        throw new Error()
      }
    } catch (error) {
      const err = new Error()
      ctx.app.emit('error', err, ctx)
    }
  }
}

module.exports = new Moment()
