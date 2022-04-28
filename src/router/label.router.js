const Router = require('koa-router')
const { verifyAuth } = require('../middleware/auth.middleware')
const { create, list, momentLabel } = require('../controller/label.controller')

const labelRouter = new Router({ prefix: '/label' })

// 创建标签
labelRouter.post('/', verifyAuth, create)
// 获取标签，根据参数返回响应不同的数据
labelRouter.get('/', list, momentLabel)

module.exports = labelRouter
