/* eslint-disable no-unused-vars */
import React from 'react'
import { List, InputItem, WingBlank, WhiteSpace, Button } from 'antd-mobile'
import Logo from '../../component/logo/logo'

class Login extends React.Component {
  constructor (props) {
    super(props)
    this.register = this.register.bind(this)
  }
  register () {
    console.log(this.props)
    this.props.history.push('/register')
  }
  render () {
    return (
      <div>
        <Logo></Logo>
        <h2>注册页面</h2>
        <WingBlank>
          <List>
            <InputItem>用户</InputItem>
            <WhiteSpace></WhiteSpace>
            <InputItem>密码</InputItem>
          </List>
          <Button type='primary'>登录</Button>
          <WhiteSpace></WhiteSpace>
          <Button onClick={this.register} type='primary'>注册</Button>
        </WingBlank>
      </div>
    )
  }
}

export default Login
