const Router = require('koa-router')
const controller = require('../controller/user.controller')
const { verifyUser, handlePassword } = require('../middleware/user.middleware')

const userRouter = new Router({ prefix: '/users' })

userRouter.post('/', verifyUser, handlePassword, controller.create)

userRouter.get('/:userId/avatar', controller.showAvatar)

module.exports = userRouter
