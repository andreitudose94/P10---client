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
        <div id="navigation" className='navigation'>
          <div className="k-rpanel-toggle left">
            <span className="k-icon k-i-arrow-chevron-left"></span>
            <FormattedMessage id='back' />
          </div>
          <div className='my-user-details'>
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
              <Link to='/data' className={'bottom-links'}>
                <div className='leftMenuIcons'>
                  <FontAwesomeIcon icon="database" />
                </div>
                <FormattedMessage id='app-data' />
              </Link>
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


          <div className="small-screen-navigation-links">
            <div className="navigation-top-links">
              <Link to='/' className={'bottom-links'}>
                <FontAwesomeIcon icon="home" />
              </Link>
            </div>
            <div className="navigation-bottom-links">
              <Link to='/data' className={'bottom-links'}>
                <FontAwesomeIcon icon="database" />
              </Link>
              <Link to='/settings' className={'bottom-links'}>
                <FontAwesomeIcon icon="cog" />
              </Link>
              <a onClick={() => logout()} className={'bottom-links'}>
                <FontAwesomeIcon icon="sign-out-alt" />
              </a>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps)(LeftMenu);
