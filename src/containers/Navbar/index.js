import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router'
import { FormattedMessage } from 'lib'
import {connect} from 'react-redux'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import styles from './index.scss'

// e.g. a.paco.com$default => default
const getTenantSuffix = (tenantName) => {
  return tenantName.substr(tenantName.lastIndexOf('$') + 1)
}

const mapStateToProps = (state) => ({
  email: getState().user.email,
  activeTenant: getState().user.activeTenant,
  name: getState().user.name,
})

class Navbar extends Component {

  render() {
    const {
      location,
      activeTenant = '',
      name = '',
      email = ''
    } = this.props
    const { pathname } = location

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
    pages['/responsiblesPositions'] = {
      title: 'respOnMap',
      useLeftMenu: true
    }
    pages['/contracts'] = {
      title: 'contracts',
      useLeftMenu: true
    }
    pages['/history_calls'] = {
      title: 'historyCalls',
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
      <div className='navBar'>
        <div>
        {
          (pages[pathname] || pages[shortPath]) &&
            <div className="k-rpanel-toggle left">
              <span className="k-icon k-i-menu"></span>
            </div>
        }
        </div>
        {
          (pages[pathname] || pages[shortPath]) &&
          <div
            className={
              pathname === '/responsiblesPositions' ?
                'navbar-title-mobile'
                :
                'navbar-title'
            }
          >
            {
              (pages[pathname] || pages[shortPath]) &&
                <FormattedMessage
                  id={
                    (pages[pathname] && pages[pathname].title) ||
                    (pages[shortPath] && pages[shortPath].title)
                  }
                />
            }
          </div>
        }

        <div className='navbar-profile-info'>
          <div className='user'>{name}</div>
          <div className='tenant'>
            ({getTenantSuffix(activeTenant, email)})
          </div>
          <FontAwesomeIcon icon="user-circle" />
        </div>
      </div>
    )
  }
}

export default withRouter(connect(mapStateToProps)(Navbar));
