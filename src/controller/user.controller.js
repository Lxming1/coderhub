const service = require('../service/user.service')
const { successMes } = require('../utils/success-body')
class User {
  async create(ctx, next) {
    //获取参数ctx.request.body
    const user = ctx.request.body

    // 查询数据库
    await service.create(user)

    // 响应数据
    ctx.body = successMes('Register Success')
  }
}

module.exports = new User()
