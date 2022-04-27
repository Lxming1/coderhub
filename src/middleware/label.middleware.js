const { verifyLabelExist } = require('../service/label.service')

class Label {
  async verifyLabelExist(ctx, next) {
    const { labels } = ctx.request.body

    const result = await verifyLabelExist(labels)
    // console.log(result)
    // await next()
  }
}

module.exports = new Label()
