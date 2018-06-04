const Router = require('koa-router')
const model = require('./model')
const User = model.getModel('user')

const router = new Router({
  prefix: '/user'
})

const register = async (ctx) => {
  console.log(ctx.request.body)
  const { user, pwd, type } = ctx.request.body
  const doc = await User.findOne({user}).exec()
  let info
  if (doc) {
    info = {
      code: 1,
      msg: '用户名重复'
    }
  } else {
    await User.create({ user, pwd, type }).exec()
      .then(() => {
        info = {
          code: 0
        }
      })
      .catch(() => {
        info = {
          code: 1,
          msg: '后端出错了'
        }
      })
  }
  ctx.body = info
}

router.get('/list', async (ctx) => {
  const list = await User.find({}).exec()
    .then((user) => {
      console.log(user)
    })
  ctx.body = {
    list
  }
})
router.post('/register', register)

router.get('/info', (ctx) => {
  ctx.body = {
    code: 1
  }
})

module.exports = router
