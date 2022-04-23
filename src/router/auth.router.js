const Router = require('koa-router')
const { login } = require('../controller/auth.controller')
const { verityLogin } = require('../middleware/auth.middleware')

const authRouter = new Router()

authRouter.post('/login', verityLogin, login)

module.exports = authRouter
