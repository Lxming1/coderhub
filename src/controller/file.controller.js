const fs = require('fs')
const { AVATAR_PATH } = require('../constants/file-types')
const { APP_HOST, APP_PORT } = require('../app/config')
const { saveFileInfo, savaAvatar, currentAvatar, rmAvatar } = require('../service/file.service')
const { successBody } = require('../utils/success-body')

class FileController {
  async saveAvatar(ctx, next) {
    const { id } = ctx.user
    // 获取图像信息
    const { mimetype, filename, size } = ctx.req.file
    // 将图像地址存入用户数据库
    await savaAvatar(`${APP_HOST}:${APP_PORT}/users/${id}/avatar`, id)
    // 将图像信息保存到数据库
    const result = await saveFileInfo(filename, mimetype, size, id)
    ctx.body = successBody(result)
  }
}

module.exports = new FileController()
