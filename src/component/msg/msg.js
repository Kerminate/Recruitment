import React, { Component } from 'react'
import { connect } from 'react-redux'
import { List, Badge } from 'antd-mobile'

@connect(
  state => state
)
class Msg extends Component {
  getLast (arr) {
    return arr[arr.length - 1]
  }
  render () {
    const Item = List.Item
    const Brief = Item.Brief
    const userid = this.props.user._id
    const userinfo = this.props.chat.users
    const msgGroup = {}
    this.props.chat.chatmsg.forEach(v => {
      msgGroup[v.chatid] = msgGroup[v.chatid] || []
      msgGroup[v.chatid].push(v)
    })
    const chatList = Object.values(msgGroup).sort((a, b) => {
      const aLast = this.getLast(a).create_time
      const bLast = this.getLast(b).create_time
      return bLast - aLast
    })
    return (
      <div>
        <List>
          { chatList.map((v) => {
            const lastItem = this.getLast(v)
            const targetId = v[0].from === userid ? v[0].to : v[0].from
            const unreadNum = v.filter((v) => !v.read && v.to === userid).length
            if (!userinfo[targetId]) {
              return null
            }
            return (
              <List key={lastItem._id}>
                <Item
                  extra={<Badge text={unreadNum}></Badge>}
                  thumb={require(`../img/${userinfo[targetId].avatar}.png`)}
                  arrow='horizontal'
                  onClick={() => {
                    this.props.history.push(`/chat/${targetId}`)
                  }}
                >
                  { lastItem.content }
                  <Brief>{ userinfo[targetId].name }</Brief>
                </Item>
              </List>
            )
          }) }
        </List>
      </div>
    )
  }
}

export default Msg
