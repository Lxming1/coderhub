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
  async create({ userId, content }) {
    const statement = `insert into moment (content, user_id) values (?, ?)`
    const result = await connection.execute(statement, [content, userId])
    return result[0]
  }

  async detail(momentId) {
    const statement = `${sqlFragment} WHERE m.id = ?`
    let result = await connection.execute(statement, [momentId])
    return result[0]
  }

  async list(pageMes) {
    const { pagesize, pagenum } = pageMes
    const offset = (pagenum - 1) * pagesize + ''
    const statement = `${sqlFragment} LIMIT ?, ?`
    const result = await connection.execute(statement, [offset, pagesize])
    return result[0]
  }

  async del(momentId) {
    const statement = `delete from moment where id = ?`
    const result = await connection.execute(statement, [momentId])
    return result[0]
  }
}

module.exports = new Moment()
