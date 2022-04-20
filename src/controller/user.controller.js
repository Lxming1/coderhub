const service = require('../service/user.service')
class User {
  async create(ctx, next) {
    //获取参数ctx.request.body
    const user = ctx.request.body

    // 查询数据库
    const res = await service.create(user)

    // 响应数据
    ctx.body = res
  }
}

module.exports = new User()
