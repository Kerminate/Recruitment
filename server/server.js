const Koa = require('koa')
const session = require('koa-session')
const bodyparser = require('koa-body')
const router = require('./user')
const model = require('./model')
const Chat = model.getModel('chat')

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

const server = require('http').Server(app.callback())
const io = require('socket.io')(server)

io.on('connection', (socket) => {
  console.log('user login')
  socket.on('sendmsg', async (data) => {
    const { from, to, msg } = data
    const chatid = [from, to].sort().join('_')
    const newChat = new Chat({
      chatid,
      from,
      to,
      content: msg
    })
    try {
      const doc = await newChat.save()
      io.emit('recvmsg', Object.assign({}, doc._doc))
      console.log(doc)
    } catch (e) {
      console.log(e)
    }
  })
})

server.listen(9093, () => {
  console.log('Node app start at 9093')
})
