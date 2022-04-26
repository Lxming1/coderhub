const Router = require('koa-router')
const { verifyAuth, verifyPermission } = require('../middleware/auth.middleware')
const { create, detail, list, del, update } = require('../controller/moment.controller.js')
const { verifyQuery } = require('../middleware/moment.middleware')

const momentRouter = new Router({ prefix: '/moment' })

// 发表动态
momentRouter.post('/', verifyAuth, create)
// 查询某一条动态
momentRouter.get('/:momentId', detail)
// 查询所有动态
momentRouter.get('/', list)
// 修改一条动态
momentRouter.patch('/:momentId', verifyAuth, verifyPermission, update)
// 删除一条动态
momentRouter.delete('/:momentId', verifyAuth, verifyPermission, del)

module.exports = momentRouter
