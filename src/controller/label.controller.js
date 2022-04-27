const { create } = require('../service/label.service')
const { successMes } = require('../utils/success-body')

class Label {
  async create(ctx) {
    const { name } = ctx.request.body
    await create(name)
    ctx.body = successMes('Create Label Success')
  }
}

module.exports = new Label()
