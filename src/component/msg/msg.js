import React, { Component } from 'react'
import { connect } from 'react-redux'

@connect(
  state => state
)
class Msg extends Component {
  render () {
    const msgGroup = {}
    this.props.chat.chatmsg.forEach(v => {
      msgGroup[v.chatid] = msgGroup[v.chatid] || []
      msgGroup[v.chatid].push(v)
    })
    console.log(msgGroup)
    return (
      <div>
        <h2>消息列表</h2>
      </div>
    )
  }
}

export default Msg
