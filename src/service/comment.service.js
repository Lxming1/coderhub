const connection = require('../app/database')
class Comment {
  async create(content, momentId, userId) {
    const statement = `
      insert into comment 
        (content, moment_id, user_id) 
      values (?,?,?)
    `
    const [result] = await connection.execute(statement, [content, momentId, userId])
    return result
  }

  async reply(content, momentId, userId, commentId) {
    const statement = `
      insert into comment 
        (content, moment_id, user_id, comment_id) 
      values (?,?,?,?)
    `
    const [result] = await connection.execute(statement, [content, momentId, userId, commentId])
    return result
  }

  async verifyReply(momentId, commentId) {
    // 传入的动态存在对应的评论
    const statement = `
      select * from comment where moment_id = ? and id = ?
    `
    const [result] = await connection.execute(statement, [momentId, commentId])
    return result
  }

  async del(commentId) {
    const statement = `delete from comment where id = ?`
    const [result] = await connection.execute(statement, [commentId])
    return result
  }

  async list(momentId) {
    const statement = `
      SELECT 
        c.id id, c.content content, c.comment_id commentId,
        JSON_OBJECT('id', u.id, 'name', u.name, 'avatarUrl', u.avatar_url) author, 
        c.createAt createTime, c.updateAt updateTime 
      FROM comment c 
      LEFT JOIN users u
      ON c.user_id = u.id
      where c.id = ?
    `
    const [result] = await connection.execute(statement, [momentId])
    return result
  }
}

module.exports = new Comment()
