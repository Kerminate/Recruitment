const Koa = require('koa')
const session = require('koa-session')
const bodyparser = require('koa-body')
const router = require('./user')

const app = new Koa()

app.keys = ['recruitment']

app.use(session({
  key: 'koa:recruitment',
  maxAge: 7 * 24 * 60 * 60 * 60 * 1000, // ms
  httpOnly: true, /** (boolean) httpOnly or not (default true) */
  signed: true /** (boolean) signed or not (default true) */
}, app))

app.use(bodyparser({
  multipart: true
}))

app.use(router.routes()).use(router.allowedMethods())

app.listen(9093, () => {
  console.log('Node app start at 9093')
})
