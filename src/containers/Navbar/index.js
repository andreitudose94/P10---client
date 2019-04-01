import React, {Component} from 'react';
import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import styles from './index.scss'

class Navbar extends Component {

  componentDidMount() {
    $("#navigation").kendoResponsivePanel({
        breakpoint: 4000
    });
  }

  render() {
    const baseUrl = ''
    const useLeftMenu = true
    return (
      <div className='navBar'>
        <div>
          <div id="navigation">
            <div className="k-rpanel-toggle left">
              <span className="k-icon k-i-arrow-chevron-left"></span>
              Back
            </div>
            <div className="navigation-links">
              <Link to={baseUrl} >
                Dashboard
              </Link>
              <Link to={baseUrl + '&pN=list_receipts_docs'} >
                Receipts to Company
              </Link>
              <Link to={baseUrl + '&pN=list_issues_docs'} >
                Issues to Company
              </Link>
              <Link to={baseUrl + '&pN=list_requests_docs'} >
                Requests
              </Link>
            </div>
          </div>
        {
          useLeftMenu &&
            <div className="k-rpanel-toggle left">
              <span className="k-icon k-i-menu"></span>
            </div>
        }
        </div>
        <div className='navbar-title'>
          Navbar
        </div>
      </div>
    )
  }
}

export default Navbar;
