import React from 'react'
import PropTypes from 'prop-types'
import { TabBar } from 'antd-mobile'
import { withRouter } from 'react-router-dom'
import bossImg from './img/boss.png'
import bossActiveImg from './img/boss-active.png'
import jobImg from './img/job.png'
import jobActiveImg from './img/job-active.png'
import msgImg from './img/msg.png'
import msgActiveImg from './img/msg-active.png'
import userImg from './img/user.png'
import userActiveImg from './img/user-active.png'

@withRouter

class NavLinkBar extends React.Component {
  static propTypes = {
    data: PropTypes.array.isRequired
  }
  constructor (props) {
    super(props)
    this.state = {}
  }
  render () {
    const navList = this.props.data.filter((v) => !v.hide)
    const { pathname } = this.props.location
    const images = {
      boss: bossImg,
      job: jobImg,
      msg: msgImg,
      user: userImg
    }
    const activeImgs = {
      boss: bossActiveImg,
      job: jobActiveImg,
      msg: msgActiveImg,
      user: userActiveImg
    }
    return (
      <div>
        <TabBar>
          { navList.map((v) => (
            <TabBar.Item
              key={v.path}
              title={v.text}
              icon={{ uri: images[v.icon] }}
              selectedIcon={{ uri: activeImgs[v.icon] }}
              selected={ pathname === v.path }
              onPress={() => this.props.history.push(v.path)}
            >

            </TabBar.Item>
          )) }
        </TabBar>
      </div>
    )
  }
}

export default NavLinkBar
