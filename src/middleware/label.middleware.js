const { verifyLabelExist, create, findId } = require('../service/label.service')

class Label {
  async verifyLabelExist(ctx, next) {
    const { labels } = ctx.request.body
    ctx.labels = []

    for (let item of labels) {
      const result = await verifyLabelExist(item)

      if (!result) {
        const result1 = await create(item)

        ctx.labels.push({
          id: result1.insertId,
          name: item,
        })
      } else {
        const result1 = await findId(item)

        ctx.labels.push({
          id: result1[0].id,
          name: item,
        })
      }
    }

    await next()
  }
}

module.exports = new Label()
