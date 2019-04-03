import React, {Component} from 'react'
import {connect} from 'react-redux'
import styles from './index.scss'

const mapStateToProps = (state) => ({tenants: getState().user.tenantsList})

class Tenants extends Component {

  render() {
    const {
      tenants = []
    } = this.props
    return (
      <div className='tenants'>
        <div className="square">
          <div className="square-content">
            <div className="tenant_logo">
              <center>
                <div className="tenant_logo_image">
                  DE
                </div>
              </center>
              <div className="tenant_logo_title">default</div>
            </div>
            <div className="tenant_name">
              <p className="line-clamp">This tenant has been created by default...</p>
              <span className="tooltiptext">This tenant has been created by default...</span>
            </div>
          </div>
        </div>

        <div className="square">
          <div className="square-content">
            <div className="tenant_logo">
              <center>
                <div className="tenant_logo_image">
                  DE
                </div>
              </center>
              <div className="tenant_logo_title">default</div>
            </div>
            <div className="tenant_name">
              <p className="line-clamp">This tenant has been created by default...</p>
              <span className="tooltiptext">This tenant has been created by default...</span>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps)(Tenants);
