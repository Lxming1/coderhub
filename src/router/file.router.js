const Router = require('koa-router')
const { verifyAuth } = require('../middleware/auth.middleware')
const { saveAvatar, savePicture } = require('../controller/file.controller')
const {
  handleAvatar,
  rmExistAvatar,
  handlePicture,
  resizePicture,
} = require('../middleware/file.middleware')

const uploadRouter = new Router({ prefix: '/upload' })

uploadRouter.post('/avatar', verifyAuth, rmExistAvatar, handleAvatar, saveAvatar)
uploadRouter.post('/picture', verifyAuth, handlePicture, resizePicture, savePicture)

module.exports = uploadRouter
