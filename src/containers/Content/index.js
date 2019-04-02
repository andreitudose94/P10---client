import React, {Component} from 'react';
import moment from 'moment'

import { setLocale } from '../../actions/intl'
import { FormattedMessage } from '../../lib'

import styles from './index.scss'

class Content extends Component {

  render() {
    const { children } = this.props;

    return (
      <div className='content'>
        {children}
      </div>
    )
  }
}

export default Content;
