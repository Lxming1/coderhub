const connection = require('../app/database')
class Label {
  async create(name) {
    const statement = `
      insert into label (name) values (?)
    `
    let [result] = await connection.execute(statement, [name])
    return result
  }

  async findId(name) {
    const statement = `
      select id from label where name = ?
    `
    let [result] = await connection.execute(statement, [name])
    return result
  }

  async list(pagesize, pagenum) {
    const offset = (pagenum - 1) * pagesize + ''
    const statement = `
      select * from label LIMIT ?, ?
    `
    const [result] = await connection.execute(statement, [offset, pagesize])
    return result
  }

  async getMomentLabel(momentId) {
    const statement = `
      SELECT 
        JSON_ARRAYAGG(
          JSON_OBJECT(
            'id', l.id,
            'name', l.name
          )
        ) labels
      FROM label l
      JOIN moment_label ml
      ON l.id = ml.label_id
      WHERE ml.moment_id = ?
    `
    const [result] = await connection.execute(statement, [momentId])
    return result
  }

  async verifyLabelExist(label) {
    const statement = `select * from label where name = ?`
    let [result] = await connection.execute(statement, [label])
    return result[0] ? true : false
  }
}

module.exports = new Label()
