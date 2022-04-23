class Auth {
  async login(ctx, next) {
    const { username } = ctx.request.body
    ctx.body = `登录成功，欢迎${username}`
  }
}

module.exports = new Auth()
