const Koa = require('koa')
const Router = require('koa-router')
const mongoose = require('mongoose')

const DBURL = 'mongodb://localhost:27017/recruitment'
mongoose.connect(DBURL)
mongoose.connection.on('connected', () => {
  console.log('mongo connected success!')
})

const app = new Koa()
const router = new Router()

router.get('/', (ctx) => {
  ctx.body = '<h1>Hello word</h1>'
})

router.get('/data', (ctx) => {
  ctx.body = {
    data: '123'
  }
})

app.use(router.routes()).use(router.allowedMethods())

app.listen(9093, () => {
  console.log('Node app start at 9093')
})
