const connection = require('../app/database')
class Auth {
  async checkResource(tableResource, id, userId) {
    const statement = `select * from ${tableResource} where id = ? and user_id = ?`
    const [result] = await connection.execute(statement, [id, userId])
    return result
  }
}

module.exports = new Auth()
