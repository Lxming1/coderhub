const Multer = require('koa-multer')
const fs = require('fs')
const { AVATAR_PATH } = require('../constants/file-types')
const { currentAvatar, rmAvatar } = require('../service/file.service')

const upload = Multer({
  dest: AVATAR_PATH,
})

const handleAvatar = upload.single('avatar')

const rmExistAvatar = async (ctx, next) => {
  const { id } = ctx.user
  // 查询用户当前是否有头像
  const avatarMes = await currentAvatar(id)
  // 添加头像前有头像则删除之
  if (avatarMes.length) {
    // 删除头像表的数据
    await rmAvatar(id)
    // 删除本地图片
    await fs.promises.rm(`${AVATAR_PATH}/${avatarMes[0].filename}`)
  }

  await next()
}

module.exports = {
  handleAvatar,
  rmExistAvatar,
}
