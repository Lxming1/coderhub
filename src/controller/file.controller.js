const { APP_HOST, APP_PORT } = require('../app/config')
const { saveFileInfo, savaAvatar, savePicInfo } = require('../service/file.service')
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

  async savePicture(ctx, next) {
    const { momentId } = ctx.query
    const { id } = ctx.user
    const { files } = ctx.req

    const reqArr = []
    for (let file of files) {
      const { mimetype, filename, size } = file
      const result = await savePicInfo(filename, mimetype, size, momentId, id)
      reqArr.push(result)
    }
    ctx.body = successBody(reqArr)
  }
}

module.exports = new FileController()
