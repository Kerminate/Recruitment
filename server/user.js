const Router = require('koa-router')
const utils = require('utility')
const only = require('only')
const model = require('./model')
const User = model.getModel('user')

const _filter = { pwd: 0, __v: 0 }

const router = new Router({
  prefix: '/user'
})

const list = async (ctx) => {
  const list = await User.find({})
  ctx.body = list
}

const info = async (ctx) => {
  let res
  const { _id } = ctx.session.profile
  if (!_id) {
    res = { code: 1 }
  } else {
    const user = await User.findOne({_id}, _filter)
    if (!user) {
      res = {
        code: 1,
        msg: '后端报错了'
      }
    } else {
      res = {
        code: 0,
        data: user
      }
    }
  }
  ctx.body = res
}

const register = async (ctx) => {
  // console.log(ctx.request.body)
  const { user, pwd, type } = ctx.request.body
  const doc = await User.findOne({user}).exec()
  let info
  if (doc) {
    info = {
      code: 1,
      msg: '用户名重复'
    }
  } else {
    const newUser = new User({
      user,
      type,
      pwd: md5Pwd(pwd)
    })
    try {
      await newUser.save()
      ctx.session.profile = only(newUser, '_id user type')
      info = {
        code: 0
      }
    } catch (e) {
      info = {
        code: 1,
        msg: '后端出错了'
      }
      console.log(e)
    }
  }
  ctx.body = info
}

const login = async (ctx) => {
  const { user, pwd } = ctx.request.body
  const doc = await User.findOne({ user, pwd: md5Pwd(pwd) }, _filter)
  let info
  if (!doc) {
    info = {
      code: 1,
      msg: '用户名或者密码错误！'
    }
  } else {
    ctx.session.profile = only(doc, '_id user type')
    info = {
      code: 0,
      data: doc
    }
  }
  ctx.body = info
}

router.get('/list', list)
router.get('/info', info)
router.post('/register', register)
router.post('/login', login)

function md5Pwd (pwd) {
  const salt = 'kpl_is_very_good2342!#*?:@~~'
  return utils.md5(utils.md5(pwd + salt))
}

module.exports = router
