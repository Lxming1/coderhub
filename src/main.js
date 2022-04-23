const app = require('./app')
const config = require('./app/config')

// 加载一下
require('./app/database')

app.listen(config.APP_PORT, () => {
  console.log('服务器启动成功')
})
