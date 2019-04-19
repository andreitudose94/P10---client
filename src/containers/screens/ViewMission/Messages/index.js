import React, {Component} from 'react'
import { FormattedMessage, connect } from 'lib'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import style from './index.scss'


class Messages extends Component {

  constructor(props) {
    super(props)
  }

  render() {

    return (
      <div className='messages'>
        Messages
      </div>
    )
  }
}

export default Messages;
