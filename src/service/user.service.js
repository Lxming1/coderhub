const connection = require('../app/database')

class User {
  async create({ username, password }) {
    const statement = `insert into users (name, password) values (?, ?)`
    const result = await connection.execute(statement, [username, password])
    return result[0]
  }

  async getUsername(name) {
    const statement = `select * from users where name = ?`
    const result = await connection.execute(statement, [name])

    return result[0]
  }
}

module.exports = new User()
