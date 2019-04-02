import React, {Component} from 'react';
import moment from 'moment'

import { setLocale } from '../../actions/intl'
import { FormattedMessage } from '../../lib'

import styles from './index.scss'

class Content extends Component {

  render() {
    return (
      <div className='content'>
        <FormattedMessage
            id={'wrongCredentials'}
        />
        <button onClick={() => setLocale('en')}>
          Apasadasdsa
        </button>
      </div>
    )
  }
}

export default Content;
