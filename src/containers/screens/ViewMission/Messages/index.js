import React, {Component} from 'react'
import { FormattedMessage, connect } from 'lib'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import style from './index.scss'


class Messages extends Component {

  constructor(props) {
    super(props)
    this.renderChat = this.renderChat.bind(this)
  }

  componentDidMount() {
    this.renderChat(this.props);
  }

  renderChat(props) {
    const { chatId } = props
    $('#' + chatId).kendoChat({
      post: function (args) {
        // sg
      }
    }).data("kendoChat");
  }

  render() {
    const { chatId } = this.props

    return (
      <div className='messages'>
        <div id={chatId}></div>
        {/* Chat */}
      </div>
    )
  }
}

export default Messages;
