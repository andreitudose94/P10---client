import React, {Component} from 'react'
import styles from './index.scss'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class Card extends Component {

  constructor(props) {
    super(props)
    this.handleSelect = this.handleSelect.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }

  render() {
    const {
      tenant = {},
      active = false,
      deletable = true,
      isAddTenant = false
    } = this.props

    return (
      <div
        className={"square " + (active ? "activeTenantSquare" : "")}
        onClick={this.handleSelect}
      >
        <div className="square-content">
          {
            active &&
              <span className="activeTenant_badge">
                <FontAwesomeIcon icon="check-circle" />
              </span>
          }
          {
            deletable && !active &&
              <span className="closeTenant_badge" onClick={this.handleClick}>
                <FontAwesomeIcon icon="times-circle" />
              </span>
          }
          <div className={isAddTenant ? 'add_tenant_logo' : "tenant_logo"}>
            <center>
              {
                isAddTenant ?
                  <div className="add_tenant_logo_image">
                    <FontAwesomeIcon icon="plus-circle" />
                  </div>
                :
                  <div className="tenant_logo_image">
                    {this.getAbbreviation(tenant.titleDisplay)}
                  </div>
              }
            </center>
            {
              !isAddTenant &&
                <div className="tenant_logo_title">{tenant.titleDisplay}</div>
            }
          </div>
          <div className="tenant_name">
            <p className="line-clamp">{tenant.description}</p>
            <span className="tooltiptext">{tenant.description}</span>
          </div>
        </div>
      </div>
    )
  }

  getAbbreviation(value) {
    const valueAux = value.trim().toUpperCase();
    if(valueAux.length > 1) {
      return valueAux.substr(0,2);
    } else {
      return valueAux;
    }
  }

  handleSelect() {
    const { onSelect, tenant = {} } = this.props
    onSelect && onSelect(tenant)
  }

  handleClick(e) {
    e.preventDefault();
    e.stopPropagation();
    const { onDelete, tenant = {} } = this.props
    onDelete && onDelete(tenant)
  }
}

export default Card;
