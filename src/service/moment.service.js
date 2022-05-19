const connection = require('../app/database')
const { APP_HOST, APP_PORT } = require('../app/config')

const sqlFragment = `
  SELECT 
    m.id id, m.content content,
    (select 
      JSON_ARRAYAGG(CONCAT('${APP_HOST}:${APP_PORT}/moment/image/', file.filename)) 
      from file where m.id = file.moment_id
    ) images,
    IF(count(l.id), JSON_ARRAYAGG(
      JSON_OBJECT(
        'id', l.id,
        'name', l.name
      )
    ) , NULL) labels,
    (select count(*) from moment_label ml where ml.moment_id = m.id) labelCount,
    (select count(*) from comment ml where ml.moment_id = m.id) commentCount,
  
    JSON_OBJECT(
      'id', u.id, 
      'name', u.name, 
      'avatarUrl', u.avatar_url
    ) author, 
    m.createAt createTime, m.updateAt updataTime
  FROM moment m
  LEFT JOIN users u ON m.user_id = u.id
  LEFT JOIN moment_label ml ON ml.moment_id = m.id
  LEFT JOIN label l ON l.id = ml.label_id
`

class Moment {
  async create(userId, content) {
    const statement = `insert into moment (content, user_id) values (?, ?)`
    const [result] = await connection.execute(statement, [content, userId])
    return result
  }

  async detail(momentId) {
    const statement = `
      ${sqlFragment} WHERE m.id = ? GROUP BY m.id
    `
    let [result] = await connection.execute(statement, [momentId])
    return result
  }

  async list(pagesize, pagenum) {
    const offset = (pagenum - 1) * pagesize + ''
    const statement = `
      ${sqlFragment} GROUP BY m.id ORDER BY m.id desc LIMIT ?, ?
    `
    try {
      const [result] = await connection.execute(statement, [offset, pagesize])
      return result
    } catch (e) {
      console.log(e)
    }
  }

  async update(momentId, newContent) {
    const statement = `update moment set content = ? where id = ?`
    const [result] = await connection.execute(statement, [newContent, momentId])
    return result
  }

  async del(momentId) {
    const statement = `delete from moment where id = ?`
    const [result] = await connection.execute(statement, [momentId])
    return result
  }

  async hasLabel(label, momentId) {
    let statement = `
      select * from moment_label where moment_id = ? and label_id = ?
    `
    const result = await connection.execute(statement, [momentId, label])
    return result[0].length ? true : false
  }

  async addLabels(label, momentId) {
    let statement = `
      insert into moment_label (label_id, moment_id) values (?, ?)
    `
    const [result] = await connection.execute(statement, [label, momentId])
    return result
  }

  async getPicInfo(filename) {
    const statement = `select * from file where filename = ?`
    const [result] = await connection.execute(statement, [filename])
    return result
  }
}

module.exports = new Moment()

// 如果在请求动态时就将评论一起获取
// const statement = `
//   SELECT
//     m.id id, m.content content, JSON_OBJECT('id', u.id, 'name', u.name) author,
//     JSON_ARRAYAGG(
//       JSON_OBJECT(
//         'id', c.id, 'content', c.content,
//         'user', JSON_OBJECT('id', cu.id, 'name', cu.name),
//         'commentId', c.comment_id, 'createTime', c.createAt,
//         'updateTime', c.updateAt
//       )
//     ) comments,
//     m.createAt createTime, m.updateAt updataTime
//   FROM moment m
//   LEFT JOIN users u
//   ON m.user_id = u.id
//   LEFT JOIN comment c
//   ON c.moment_id = m.id
//   LEFT JOIN users cu
//   ON c.user_id = cu.id
//   WHERE m.id = ?
// `

// (select JSON_ARRAYAGG(JSON_OBJECT(
// 	'id', cc.id, 'author', JSON_OBJECT(
//     'id', uu.id, 'name', uu.name
//   ), 'content', cc.content,
//   "momentId", cc.moment_id, "commentId", cc.comment_id
// )) from comment cc join moment mm on cc.moment_id = mm.id and mm.id = m.id join users uu on uu.id = cc.user_id) comments,
