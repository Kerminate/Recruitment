const Router = require('koa-router')
const utils = require('utility')
const only = require('only')
const model = require('./model')
const User = model.getModel('user')
const Chat = model.getModel('chat')

const _filter = { pwd: 0, __v: 0 }

const router = new Router({
  prefix: '/user'
})

const list = async (ctx) => {
  const { type } = ctx.query
  const list = await User.find({type})
  ctx.body = {
    code: 0,
    data: list
  }
}

const info = async (ctx) => {
  let res
  if (!ctx.session.profile || !ctx.session.profile._id) {
    res = { code: 1 }
  } else {
    const { _id } = ctx.session.profile
    const user = await User.findOne({_id}, _filter).exec()
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

const getmsglist = async (ctx) => {
  let res
  const users = {}
  const user = ctx.session.profile._id
  const userdoc = await User.find({}).exec()
  userdoc.forEach((v) => {
    users[v._id] = { name: v.user, avatar: v.avatar }
  })
  const list = await Chat.find({ '$or': [{from: user}, {to: user}] }).exec()
  if (!list) {
    res = {
      code: 1,
      msg: '后端报错了'
    }
  } else {
    res = {
      code: 0,
      msgs: list,
      users: users
    }
  }
  ctx.body = res
}

const update = async (ctx) => {
  const userId = ctx.session.profile._id
  let res
  if (!userId) {
    res = { code: 1 }
  } else {
    const body = ctx.request.body
    await User.findByIdAndUpdate(userId, body, {new: true}).exec()
      .then((doc) => {
        const data = only(doc, 'user type avatar desc title')
        res = { code: 0, data }
      })
      .catch((e) => {
        res = { code: 1 }
        console.log(e)
      })
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

// 登出
const logout = async (ctx) => {
  delete ctx.session.profile
  ctx.body = { code: 0 }
}

const readmsg = async (ctx) => {
  let info
  const userid = ctx.session.profile._id
  const { from } = ctx.request.body
  const doc = await Chat.update(
    { from, to: userid },
    { '$set': { read: true } },
    { 'multi': true }
  ).exec()
  if (!doc) {
    info = {
      code: 1,
      msg: '修改失败'
    }
  } else {
    info = {
      code: 0,
      num: doc.nModified
    }
  }
  ctx.body = info
}

router.get('/list', list)
router.get('/info', info)
router.get('/getmsglist', getmsglist)
router.post('/update', update)
router.post('/register', register)
router.post('/login', login)
router.post('/logout', logout)
router.post('/readmsg', readmsg)

function md5Pwd (pwd) {
  const salt = 'kpl_is_very_good2342!#*?:@~~'
  return utils.md5(utils.md5(pwd + salt))
}

module.exports = router
