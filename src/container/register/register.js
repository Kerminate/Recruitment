import React from 'react'
import { List, InputItem, WhiteSpace, Button, Radio } from 'antd-mobile'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import Logo from '../../component/logo/logo'
import { register } from '../../redux/user.redux'
import homeForm from '../../component/home-form/home-form'

@connect(
  state => state.user,
  { register }
)
@homeForm
class Register extends React.Component {
  constructor (props) {
    super(props)
    this.handleRegister = this.handleRegister.bind(this)
  }
  componentDidMount () {
    this.props.handleChange('type', 'genius')
  }
  handleRegister () {
    this.props.register(this.props.state)
  }
  render () {
    const RadioItem = Radio.RadioItem
    return (
      <div>
        { this.props.redirectTo ? <Redirect to={this.props.redirectTo}></Redirect> : null }
        <Logo></Logo>
        <List>
          { this.props.msg ? <p className='error-msg'>{this.props.msg}</p> : null }
          <InputItem onChange={v => this.props.handleChange('user', v)}>用户名</InputItem>
          <WhiteSpace></WhiteSpace>
          <InputItem onChange={v => this.props.handleChange('pwd', v)} type='password'>密码</InputItem>
          <WhiteSpace></WhiteSpace>
          <InputItem onChange={v => this.props.handleChange('repeatpwd', v)} type='password'>确认密码</InputItem>
          <WhiteSpace></WhiteSpace>
          <RadioItem checked={this.props.state.type === 'genius'} onChange={() => this.props.handleChange('type', 'genius')}>牛人</RadioItem>
          <RadioItem checked={this.props.state.type === 'boss'} onChange={() => this.props.handleChange('type', 'boss')}>BOSS</RadioItem>
          <WhiteSpace></WhiteSpace>
          <Button type='primary' onClick={this.handleRegister}>注册</Button>
        </List>
      </div>
    )
  }
}

export default Register
