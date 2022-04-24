const Router = require('koa-router')
const { verifyAuth } = require('../middleware/auth.middleware')
const { create, detail, list, del } = require('../controller/moment.controller.js')

const momentRouter = new Router({ prefix: '/moment' })

// 发表动态
momentRouter.post('/', verifyAuth, create)
// 查询某一条动态
momentRouter.get('/:momentId', verifyAuth, detail)
// 查询所有动态
momentRouter.get('/', verifyAuth, list)
// 删除一条动态
momentRouter.delete('/:momentId', verifyAuth, del)

module.exports = momentRouter
