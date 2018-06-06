import React, { Component } from 'react'
import { Grid, List } from 'antd-mobile'
import PropTypes from 'prop-types'

class AvatarSelector extends Component {
  static propTypes = {
    selectAvatar: PropTypes.func.isRequired
  }
  constructor (props) {
    super(props)
    this.state = {}
  }
  render () {
    const requireContext = require.context('../img', true, /^\.\/.*\.png$/)
    const images = requireContext.keys().map(requireContext)
    const avatarList = 'boy,bull,chick,crab,girl,hedgenhog,hippopotamus,koala,lemur,man,pig,tiger,whale,woman,zebra'
      .split(',')
      .map((v, index) => ({
        icon: images[index],
        text: v
      }))
    const gridHeader = this.state.icon
      ? (<div>
        <span>已选择头像</span>
        <img style={{width: 20}} src={this.state.icon} alt=""/>
      </div>)
      : '请选择头像'

    return (
      <div>
        <List renderHeader={() => gridHeader}>
          <Grid data={avatarList} columnNum={5}
            onClick={(ele) => {
              this.setState(ele)
              this.props.selectAvatar(ele.text)
            }}></Grid>
        </List>
      </div>
    )
  }
}

export default AvatarSelector
