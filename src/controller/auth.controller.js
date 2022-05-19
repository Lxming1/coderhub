const jwt = require('jsonwebtoken')
const { PRIVATE_KEY } = require('../app/config')
const { getUserAvatar } = require('../service/user.service')
const { successBody } = require('../utils/success-body')

class Auth {
  async login(ctx, next) {
    const { id, name } = ctx.user
    const token = jwt.sign({ id, name }, PRIVATE_KEY, {
      expiresIn: 60 * 60 * 24,
      algorithm: 'RS256',
    })

    const userAvatar = await getUserAvatar(id)
    const avatarUrl = userAvatar.avatar_url

    ctx.body = successBody({ id, name, avatarUrl, token })
  }
}

module.exports = new Auth()
