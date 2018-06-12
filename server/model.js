const mongoose = require('mongoose')

const DBURL = 'mongodb://localhost:27017/recruitment'
mongoose.connect(DBURL)
mongoose.connection.on('connected', () => {
  console.log('mongo connected success!')
})

const models = {
  user: {
    user: { type: String, require: true },
    pwd: { type: String, require: true },
    type: { type: String, require: true },
    avatar: String, // 头像
    desc: String, // 个人简介或者职位描述
    title: String, // 职位名
    // 如果是 Boss，还有2个字段
    company: String,
    money: String
  },
  chat: {
    chatid: { type: String, require: true },
    from: { type: String, require: true },
    to: { type: String, require: true },
    read: { type: Boolean, default: false },
    content: { type: String, require: true, default: '' },
    create_time: { type: Number, default: Date.now() }
  }
}

for (const m in models) {
  mongoose.model(m, new mongoose.Schema(models[m]))
}

module.exports = {
  getModel: (name) => {
    return mongoose.model(name)
  }
}
