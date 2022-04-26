const connection = require('../app/database')

const sqlFragment = `
  SELECT 
    m.id id, m.content content, JSON_OBJECT('id', u.id, 'name', 
    u.name ) author, m.createAt createTime, m.updateAt updataTime
  FROM moment m 
  LEFT JOIN users u 
  ON m.user_id = u.id
`

class Moment {
  async create(userId, content) {
    const statement = `insert into moment (content, user_id) values (?, ?)`
    const result = await connection.execute(statement, [content, userId])
    return result[0]
  }

  async detail(momentId) {
    const statement = `
      SELECT 
        m.id id, m.content content, JSON_OBJECT('id', u.id, 'name', 
        u.name ) author, m.createAt createTime, m.updateAt updataTime
      FROM moment m 
      LEFT JOIN users u 
      ON m.user_id = u.id
      WHERE m.id = ?
    `
    let result = await connection.execute(statement, [momentId])
    return result[0]
  }

  async list(pagesize, pagenum) {
    const offset = (pagenum - 1) * pagesize + ''
    const statement = `
      SELECT 
        m.id id, m.content content, JSON_OBJECT('id', u.id, 'name', u.name) 
        author, (select count(*) from comment c where c.moment_id = m.id) 
        momentCount, m.createAt createTime, m.updateAt updataTime
      FROM moment m 
      LEFT JOIN users u 
      ON m.user_id = u.id
      LIMIT ?, ?
    `
    const result = await connection.execute(statement, [offset, pagesize])
    return result[0]
  }

  async update(momentId, newContent) {
    const statement = `update moment set content = ? where id = ?`
    const result = await connection.execute(statement, [newContent, momentId])
    return result[0]
  }

  async del(momentId) {
    const statement = `delete from moment where id = ?`
    const result = await connection.execute(statement, [momentId])
    return result[0]
  }
}

module.exports = new Moment()
