import React, {Component} from 'react';
import moment from 'moment'

import { setLocale } from 'actions/intl'
import { FormattedMessage } from 'lib'

import styles from './index.scss'

class Content extends Component {

  render() {
    const { children, pathname = {} } = this.props;

    let pages = {}
    pages['/'] = {
      title: 'home',
      useLeftMenu: true
    }
    pages['/settings'] = {
      title: 'settings',
      useLeftMenu: true
    }
    pages['/data'] = {
      title: 'app-data',
      useLeftMenu: true
    }
    pages['/new_call'] = {
      title: 'callRegistration',
      useLeftMenu: true
    }

    return (
      <div className='content'>
        <div className='title-page'>
          <FormattedMessage id={(pages[pathname] || {}).title} />
        </div>
        {children}
      </div>
    )
  }
}

export default Content;
