import React, { Component } from 'react'
import { Grid, List } from 'antd-mobile'
import PropTypes from 'prop-types'
import boyImg from '../img/boy.png'
import bullImg from '../img/bull.png'
import chickImg from '../img/chick.png'
import crabImg from '../img/crab.png'
import girlImg from '../img/girl.png'
import hedgenhogImg from '../img/hedgehog.png'
import hippopotamusImg from '../img/hippopotamus.png'
import koalaImg from '../img/koala.png'
import lemurImg from '../img/lemur.png'
import manImg from '../img/man.png'
import pigImg from '../img/pig.png'
import tigerImg from '../img/tiger.png'
import whaleImg from '../img/whale.png'
import womanImg from '../img/woman.png'
import zebraImg from '../img/zebra.png'

class AvatarSelector extends Component {
  static propTypes = {
    selectAvatar: PropTypes.func.isRequired
  }
  constructor (props) {
    super(props)
    this.state = {}
  }
  render () {
    const images = [boyImg, girlImg, manImg, womanImg, bullImg, chickImg, crabImg, hedgenhogImg, hippopotamusImg, koalaImg,
      lemurImg, pigImg, tigerImg, whaleImg, zebraImg]
    const imagesText = ['boy', 'girl', 'man', 'woman', 'bull', 'chick', 'crab', 'hedgenhog', 'hippopotamus', 'koala',
      'lemur', 'pig', 'tiger', 'whale', 'zebra']
    const avatarList = images.map((v, index) => ({
      icon: images[index],
      text: imagesText[index]
    }))
    // const requireContext = require.context('../img', true, /^\.\/.*\.png$/)
    // const images = requireContext.keys().map(requireContext)
    // const avatarList = 'boy,bull,chick,crab,girl,hedgenhog,hippopotamus,koala,lemur,man,pig,tiger,whale,woman,zebra'
    //   .split(',')
    //   .map((v, index) => ({
    //     icon: images[index],
    //     text: v
    //   }))
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
