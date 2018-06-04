import React from 'react'
import { List, InputItem, WhiteSpace, Button, Radio } from 'antd-mobile'
import { connect } from 'react-redux'
import Logo from '../../component/logo/logo'
import { register } from '../../redux/user.redux'

@connect(
  state => state.user,
  { register }
)

class Register extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      user: '',
      pwd: '',
      repeatpwd: '',
      type: 'genius'
    }
    this.handleRegister = this.handleRegister.bind(this)
  }
  handleChange (key, value) {
    this.setState({
      [key]: value
    })
  }
  handleRegister () {
    this.props.register(this.state)
  }
  render () {
    const RadioItem = Radio.RadioItem
    return (
      <div>
        <Logo></Logo>
        <List>
          { this.props.msg ? <p className='errro-msg'>{this.props.msg}</p> : null }
          <InputItem onChange={v => this.handleChange('user', v)}>用户名</InputItem>
          <WhiteSpace></WhiteSpace>
          <InputItem onChange={v => this.handleChange('pwd', v)} type='password'>密码</InputItem>
          <WhiteSpace></WhiteSpace>
          <InputItem onChange={v => this.handleChange('repeatpwd', v)} type='password'>确认密码</InputItem>
          <WhiteSpace></WhiteSpace>
          <RadioItem checked={this.state.type === 'genius'} onChange={() => this.handleChange('type', 'genius')}>牛人</RadioItem>
          <RadioItem checked={this.state.type === 'boss'} onChange={() => this.handleChange('type', 'boss')}>BOSS</RadioItem>
          <WhiteSpace></WhiteSpace>
          <Button type='primary' onClick={this.handleRegister}>注册</Button>
        </List>
      </div>
    )
  }
}

export default Register
