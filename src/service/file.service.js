const connection = require('../app/database')
class FileService {
  async saveFileInfo(filename, mimetype, size, userId) {
    const statement = `
      insert into avatar (filename, mimetype, size, user_id) values(?,?,?,?)
    `
    const [result] = await connection.execute(statement, [filename, mimetype, size, userId])
    return result
  }

  async currentAvatar(userId) {
    const statement = `select * from avatar where user_id = ?`
    const [result] = await connection.execute(statement, [userId])
    return result
  }

  async rmAvatar(userId) {
    const statement = `delete from avatar where user_id = ?`
    const [result] = await connection.execute(statement, [userId])
    return result
  }

  async savaAvatar(avatarUrl, userId) {
    const statement = `
      update users set avatar_url = ? where id = ?
    `
    const [result] = await connection.execute(statement, [avatarUrl, userId])
    return result
  }
}

module.exports = new FileService()
