import React, {Component} from 'react';
import moment from 'moment'

import { setLocale } from 'actions/intl'
import { FormattedMessage } from 'lib'

import styles from './index.scss'

class Content extends Component {

  render() {
    const { children, pathname = {} } = this.props;

    let pages = {}
    let shortPath = ''
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
    if(pathname.includes('/view_mission/')) {
      shortPath = '/view_mission'
      pages['/view_mission'] = {
        title: 'viewMission',
        useLeftMenu: true
      }
    }

    return (
      <div className='content'>
        {
          (pages[pathname] && pages[pathname].title) ||
          (pages[shortPath] && pages[shortPath].title) &&
            <div className='title-page'>
              <center>
                <FormattedMessage
                  id={
                    (pages[pathname] && pages[pathname].title) ||
                    (pages[shortPath] && pages[shortPath].title)
                  }
                />
              </center>
            </div>
        }
        {children}
      </div>
    )
  }
}

export default Content;
