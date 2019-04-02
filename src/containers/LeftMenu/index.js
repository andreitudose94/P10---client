import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import { FormattedMessage } from '../../lib'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { logout } from '../../actions/user'

import styles from './index.scss'

class LeftMenu extends Component {

  componentDidMount() {
    $("#navigation").kendoResponsivePanel({
        breakpoint: 4000
    });
  }

  componentDidUpdate() {
    const panel = $("#navigation").data('kendoResponsivePanel')
    if(panel) {
      panel.close()
    }
  }

  render() {

    return (
      <div className='leftMenu'>
        <div id="navigation">
          <div className="k-rpanel-toggle left">
            <span className="k-icon k-i-arrow-chevron-left"></span>
            Back
          </div>
          <div className="navigation-links">
            <div className="navigation-top-links">
              <Link to='/' >
                Dashboard
              </Link>
              <Link to='/' >
                Dashboard
              </Link>
            </div>
            <div className="navigation-bottom-links">
              <Link to='/' className={'bottom-links'}>
                Issues to Company
              </Link>
              <Link to='/settings' className={'bottom-links'}>
                Settings
              </Link>
              <a onClick={() => logout()} className={'bottom-links'}>
                Logout
              </a>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default LeftMenu;
