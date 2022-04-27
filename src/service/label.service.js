const connection = require('../app/database')
class Label {
  async create(name) {
    const statement = `
      insert into label (name) values (?)
    `
    let result = await connection.execute(statement, [name])
    return result[0]
  }

  async verifyLabelExist(labels) {
    const statement = `select * from label where name = ?`
    const newLabels = []
    const promiseArr = []
    labels.forEach(async (item) => {
      promiseArr.push(
        connection.execute(statement, [item]).then(([res]) => {
          newLabels.push(res[0]?.name)
        })
      )
      // const [result] = await connection.execute(statement, [item])
      // result.length && newLabels.push(result[0].name)
      // console.log(newLabels)
    })
    Promise.all(promiseArr).then(() => {
      console.log(newLabels)
    })
    // console.log(labels)
    // console.log(newLabels)
    // console.log([...new Set([...newLabels, ...labels])])
    return [...new Set([...newLabels, ...labels])]
  }
}

module.exports = new Label()
