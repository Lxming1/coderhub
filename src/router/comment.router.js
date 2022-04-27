const Router = require('koa-router')
const { create, reply, del, list } = require('../controller/comment.controller')
const { verifyAuth, verifyPermission } = require('../middleware/auth.middleware')
const { verifyReply } = require('../middleware/comment.middleware')

const commentRouter = new Router({ prefix: '/comment' })

// 发表评论
commentRouter.post('/', verifyAuth, create)
// 回复评论
commentRouter.post('/:commentId/reply', verifyAuth, verifyReply, reply)
// 删除评论
commentRouter.delete('/:commentId', verifyAuth, verifyPermission, del)
// 获取评论列表
commentRouter.get('/', list)

module.exports = commentRouter
