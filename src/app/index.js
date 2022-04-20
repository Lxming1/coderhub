const Koa = require('koa')
const multer = require('koa-multer')
const bodyparse = require('koa-bodyparser')

const { userRouter } = require('../router/user.router')
const errorHandle = require('./error-handle')

const app = new Koa()
const upload = multer()

app.use(bodyparse())

app.use(userRouter.routes())
app.use(userRouter.allowedMethods())

app.on('error', errorHandle)

module.exports = app
