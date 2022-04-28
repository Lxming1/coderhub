const fs = require('fs')
const { AVATAR_PATH } = require('../constants/file-types')
const { getAvatarInfo } = require('../service/user.service')
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

  // 展示图片
  async showAvatar(ctx) {
    const { userId } = ctx.params

    const result = await getAvatarInfo(userId)

    ctx.response.set('content-type', result[0].mimetype)
    ctx.body = fs.createReadStream(`${AVATAR_PATH}/${result[0].filename}`)
  }
}

module.exports = new User()
