const Koa = require('koa')
const bodyparser = require('koa-body')
const router = require('./user')

const app = new Koa()

app.use(bodyparser({
  multipart: true
}))
app.use(router.routes()).use(router.allowedMethods())

app.listen(9093, () => {
  console.log('Node app start at 9093')
})
