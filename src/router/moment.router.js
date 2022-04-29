const Router = require('koa-router')
const { verifyAuth, verifyPermission } = require('../middleware/auth.middleware')
const {
  create,
  detail,
  list,
  del,
  update,
  addLabels,
  showPicture,
} = require('../controller/moment.controller.js')
const { verifyLabelExist } = require('../middleware/label.middleware')

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
// 给动态添加标签
momentRouter.post('/:momentId/labels', verifyAuth, verifyPermission, verifyLabelExist, addLabels)
// 获取动态图片
momentRouter.get('/image/:filename', showPicture)

module.exports = momentRouter
