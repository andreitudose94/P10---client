import React, {Component} from 'react'
import { FormattedMessage, connect } from 'lib'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import style from './index.scss'

class Chat extends Component {

  componentDidMount() {
    const { chatId, messages = [], sendMessage } = this.props

    $('#' + chatId).kendoChat({
      user: {
        name: "Chat User"
      },
      sendMessage: (e) => {
        sendMessage && sendMessage(e.text)
      }
    })

    const chat = $('#' + chatId).data("kendoChat");

    messages.forEach((m) => {

      let sentBy = {
        id: kendo.guid(),
        name: m.sentBy,
      }
      if(m.sentBy === getState().user.name) {
        sentBy = chat.getUser()
      }

      chat.renderMessage({
        type: "text",
        text: m.text
      }, sentBy)
    })
  }

  render() {
    const { chatId } = this.props

    return (
      <div id={chatId}></div>
    )
  }
}

export default Chat;
