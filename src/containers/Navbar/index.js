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
      <div className='navBar'>
        <div>
        {
          pages[pathname] &&
            <div className="k-rpanel-toggle left">
              <span className="k-icon k-i-menu"></span>
            </div>
        }
        </div>
        {
          pages[pathname] &&
          <div className='navbar-title'>
            <FormattedMessage id={pages[pathname].title} />
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
