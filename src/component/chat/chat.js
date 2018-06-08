import React, { Component } from 'react'

class Chat extends Component {
  render () {
    return (
      <div>
        <h2>chat with user:{this.props.match.params.user}</h2>
      </div>
    )
  }
}

export default Chat
