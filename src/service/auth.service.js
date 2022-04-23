const connection = require('../app/database')
class Auth {
  async verityUP(user) {
    const statement = `select * from users where name = ?`
    const result = await connection.execute(statement, [user.username])
    return result[0]
  }
}

module.exports = new Auth()
