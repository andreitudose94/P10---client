import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router'
import { FormattedMessage } from 'lib'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import styles from './index.scss'

class Navbar extends Component {

  render() {
    const { location } = this.props
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

    return (
      <div className='navBar'>
        <div>
        {
          pages[pathname].useLeftMenu &&
            <div className="k-rpanel-toggle left">
              <span className="k-icon k-i-menu"></span>
            </div>
        }
        </div>
        <div className='navbar-title'>
          <FormattedMessage id={pages[pathname].title} />
        </div>
      </div>
    )
  }
}

export default withRouter(Navbar);
