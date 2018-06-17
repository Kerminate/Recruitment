import Koa from 'koa'
import session from 'koa-session'
import bodyparser from 'koa-body'
import staticServe from 'koa-static'
// import send from 'koa-send'
import path from 'path'
import router from './user'
import model from './model'

// eslint-disable-next-line
import csshook from 'css-modules-require-hook/preset'
import assethook from 'asset-require-hook'

import React from 'react'
import { renderToString } from 'react-dom/server'
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import { StaticRouter } from 'react-router-dom'
import App from '../src/app'
import reducers from '../src/reducer'
import staticPath from '../build/asset-manifest.json'

assethook({
  extensions: ['png']
})

const Chat = model.getModel('chat')
const app = new Koa()
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

app.use(async (ctx, next) => {
  const userUrl = ctx.url.substr(0, 5)
  const staticUrl = ctx.url.substr(0, 8)
  if (userUrl === '/user/' || staticUrl === '/static/') {
    return next()
  }
  const store = createStore(reducers, compose(
    applyMiddleware(thunk)
  ))
  const context = {}
  const markup = renderToString(
    (<Provider store={store}>
      <StaticRouter
        location={ctx.url}
        context={context}
      >
        <App></App>
      </StaticRouter>
    </Provider>)
  )

  const pageHtml =
  `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width,initial-scale=1,shrink-to-fit=no">
        <meta name="theme-color" content="#000000">
        <link rel="manifest" href="/manifest.json">
        <link rel="shortcut icon" href="/favicon.ico">
        <title>React App</title>
        <link href="/${staticPath['main.css']}" rel="stylesheet">
    </head>
    <body>
        <noscript>You need to enable JavaScript to run this app.</noscript>
        <div id="root">${markup}</div>
        <script type="text/javascript" src="/${staticPath['main.js']}"></script>
    </body>
    
    </html>
  `
  ctx.body = pageHtml
})

app.use(staticServe(path.resolve('build'), {
  maxage: 7 * 24 * 60 * 60 // 7 天不更新，也就是缓存期限
}))

server.listen(9093, () => {
  console.log('Node app start at 9093')
})
