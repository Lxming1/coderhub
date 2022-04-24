const jwt = require('jsonwebtoken')
const { PRIVATE_KEY } = require('../app/config')
const { successBody } = require('../utils/success-body')

class Auth {
  async login(ctx, next) {
    const { id, name } = ctx.user
    const token = jwt.sign({ id, name }, PRIVATE_KEY, {
      expiresIn: 60 * 60 * 24,
      algorithm: 'RS256',
    })

    ctx.body = successBody({ id, name, token })
  }
}

module.exports = new Auth()
