const Router = require('koa-router')
const controller = require('../controller/user.controller')
const { verifyUser } = require('../middleware/user.middleware')

const router = new Router({ prefix: '/users' })

router.post('/', verifyUser, controller.create)

module.exports = {
  userRouter: router,
}
