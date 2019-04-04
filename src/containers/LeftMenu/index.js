import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { FormattedMessage, connect } from 'lib'

import { logout } from 'actions/user'

import styles from './index.scss'

const mapStateToProps = (state) => ({
  role: getState().user.role,
  userName: getState().user.name
})

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
    const { role = '', userName = '' } = this.props

    return (
      <div className='leftMenu'>
        <div id="navigation">
          <div className="k-rpanel-toggle left">
            <span className="k-icon k-i-arrow-chevron-left"></span>
            <FormattedMessage id='back' />
          </div>
          <div>
            <div className='user'>
              {userName}
            </div>
            <div className='role'>
              {role}
            </div>
          </div>
          <div className="navigation-links">
            <div className="navigation-top-links">
              <Link to='/' className={'bottom-links'} >
                <div className='leftMenuIcons'>
                  <FontAwesomeIcon icon="home" />
                </div>
                <FormattedMessage id='homePage' />
              </Link>
            </div>
            <div className="navigation-bottom-links">
              <Link to='/settings' className={'bottom-links'}>
                <div className='leftMenuIcons'>
                  <FontAwesomeIcon icon="cog" />
                </div>
                <FormattedMessage id='settings' />
              </Link>
              <a onClick={() => logout()} className={'bottom-links'}>
                <div className='leftMenuIcons'>
                  <FontAwesomeIcon icon="sign-out-alt" />
                </div>
                <FormattedMessage id='logout' />
              </a>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps)(LeftMenu);
