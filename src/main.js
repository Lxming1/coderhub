const app = require('./app')
const config = require('./app/config')

require('./app/database')

app.listen(config.APP_PORT, () => {
  console.log(config.APP_PORT + '服务器启动成功')
})
