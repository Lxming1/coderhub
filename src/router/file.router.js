const Router = require('koa-router')
const { verifyAuth } = require('../middleware/auth.middleware')
const { saveAvatar } = require('../controller/file.controller')
const { handleAvatar, rmExistAvatar } = require('../middleware/file.middleware')

const uploadRouter = new Router({ prefix: '/upload' })

uploadRouter.post('/avatar', verifyAuth, rmExistAvatar, handleAvatar, saveAvatar)

module.exports = uploadRouter
