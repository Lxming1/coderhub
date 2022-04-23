const Koa = require('koa')
const multer = require('koa-multer')
const bodyparse = require('koa-bodyparser')

const errorHandle = require('./error-handle')
const useRoutes = require('../router')

const app = new Koa()
const upload = multer()

app.useRoutes = useRoutes

app.use(bodyparse())

app.useRoutes()

app.on('error', errorHandle)

module.exports = app
