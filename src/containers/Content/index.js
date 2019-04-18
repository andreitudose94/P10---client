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
    pages['/history_calls'] = {
      title: '',
      useLeftMenu: true
    }

    return (
      <div className='content'>
        {
          pages[pathname] && pages[pathname].title &&
            <div className='title-page'>
              <center>
                <FormattedMessage id={pages[pathname].title} />
              </center>
            </div>
        }
        {children}
      </div>
    )
  }
}

export default Content;
