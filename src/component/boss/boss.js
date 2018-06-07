import React, { Component } from 'react'
import axios from 'axios'
import { Card, WhiteSpace, WingBlank } from 'antd-mobile'
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

class Boss extends Component {
  constructor (props) {
    super(props)
    this.state = {
      data: []
    }
  }
  componentDidMount () {
    axios.get('/user/list?type=genius')
      .then((res) => {
        if (res.data.code === 0) {
          this.setState({ data: res.data.data })
        }
      })
  }
  render () {
    const Header = Card.Header
    const Body = Card.Body
    const images = {
      boy: boyImg,
      girl: girlImg,
      man: manImg,
      woman: womanImg,
      bull: bullImg,
      chick: chickImg,
      crab: crabImg,
      hedgenhog: hedgenhogImg,
      hippopotamus: hippopotamusImg,
      koala: koalaImg,
      lemur: lemurImg,
      pig: pigImg,
      tiger: tigerImg,
      whale: whaleImg,
      zebra: zebraImg}
    return (
      <div>
        <WingBlank>
          <WhiteSpace></WhiteSpace>
          { this.state.data.map((v) => (
            v.avatar ? (
              <Card key={v._id}>
                <Header title={v.user} thumb={images[v.avatar]} extra={<span>{v.title}</span>}></Header>
                <Body>
                  { v.desc.split('\n').map((v) => (
                    <div key={v}>{v}</div>
                  )) }
                </Body>
              </Card>
            ) : null
          )) }
        </WingBlank>
      </div>
    )
  }
}

export default Boss
