const connection = require('../app/database')

class User {
  async create({ username, password }) {
    const statement = `insert into users (name, password) values (?, ?)`
    const result = await connection.execute(statement, [username, password])
    return result[0]
  }

  async verifyName(name) {
    const statement = `select * from users where name = ?`
    const result = await connection.execute(statement, [name])
    return result[0]
  }

  async getAvatarInfo(userId) {
    const statement = `select * from avatar where user_id = ?`
    const [result] = await connection.execute(statement, [userId])
    return result
  }

  async getUserAvatar(userId) {
    const statement = `select avatar_url from users where id = ?`
    const [result] = await connection.execute(statement, [userId])
    return result[0]
  }
}

module.exports = new User()
