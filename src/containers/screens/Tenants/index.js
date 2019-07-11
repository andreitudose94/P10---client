import React, {Component} from 'react'
import {connect} from 'react-redux'
import { FormattedMessage } from 'lib'
import { injectIntl } from 'react-intl'
import Simplert from 'react-simplert'

import NewTenant from './NewTenant'

import styles from './index.scss'
import Card from './Card'
import Modal from 'components/Modal'
import {
  deleteTenant,
  setActiveTenant,
  getUserEmail,
  activateTenant
} from 'actions/user'

import Textbox from 'components/Textbox'
import Button from 'components/Button'

// e.g. a.paco.com$default => default
const getTenantSuffix = (tenantName) => {
  return tenantName.substr(tenantName.lastIndexOf('$') + 1)
}

// e.g. a.paco.com$default => a.paco.com
const getTenantPreffix = (tenantName) => {
  return tenantName.substr(0, tenantName.lastIndexOf('$'))
}

const mapStateToProps = (state) => ({
  primaryTenant: getState().user.primaryTenant,
  activeTenant: getState().user.activeTenant,
  tenants: getState().user.tenantsList,
  email: getState().user.email,
  role: getState().user.role
})

class Tenants extends Component {

  constructor(props) {
    super(props)
    this.state = {
      showModal: false,
      tenantTitle: '',
      alertShow: false,
      alertType: '',
      alertTitle: '',
      alertMssg: ''
    }
    this.openModal = this.openModal.bind(this)
    this.deleteTenant = this.deleteTenant.bind(this)
    this.handleCloseModal = this.handleCloseModal.bind(this)
    this.activateTenant = this.activateTenant.bind(this)
  }

  render() {
    const {
      primaryTenant = '',
      activeTenant = '',
      tenants = [],
      email = '',
      intl = {},
      role = ''
    } = this.props

    const {
      showModal,
      tenantTitle,
      alertShow = false,
      alertType = 'info',
      alertTitle = 'Title',
      alertMssg = 'No message'
    } = this.state

    return (
      <div className='tenants'>
        {
          tenants.map((t) => (
            <Card
              key={t.title}
              active={t.title === activeTenant}
              deletable={t.title !== primaryTenant && role === 'Admin'}
              tenant={{
                ...t,
                titleDisplay: getTenantSuffix(t.title),
              }}
              onSelect={this.activateTenant}
              onDelete={this.deleteTenant}
            />
          ))
        }

        {
          role === 'Admin' &&
            <Card
              active={false}
              deletable={false}
              isAddTenant={true}
              tenant={{
                title: '',
                description: 'Add New Tenant'
              }}
              onSelect={this.openModal}
            />
        }

        <Modal
          visible={showModal}
          onClose={this.handleCloseModal}
          title={
            intl.formatMessage({
              id: 'createTenant'
            })
          }
        >
          <NewTenant
            onCloseModal={this.handleCloseModal}
          />
        </Modal>

        <Simplert
          showSimplert={alertShow}
          type={alertType}
          title={alertTitle}
          message={alertMssg}
          onClose={() => this.setState({alertShow: false})}
        />

      </div>
    )
  }

  handleCloseModal() {
    this.setState({showModal: false})
  }

  activateTenant(tenant) {
    const { intl = {} } = this.props

    activateTenant(tenant.title)
      .then((activatedTenant) => {
        if (activatedTenant.error) {
          return this.setState({
            alertShow: true,
            alertType: 'error',
            alertTitle: intl.formatMessage({id: 'error'}),
            alertMssg: activatedTenant.error
          })

        }
        setActiveTenant(activatedTenant)
      })
  }

  openModal() {
    this.setState({showModal: true})
  }

  deleteTenant(tenant) {
    const { email = '', intl = {} } = this.props
    const r = confirm('Are you sure you want to remove the ' + tenant.titleDisplay + ' tenant? This opperation will automatically delete all the data registered in this tenant and will not be able to be revoked later!')
    if(r) {
      deleteTenant({
        ...tenant,
        title: tenant.title,
      })
      .then((res) => {
        if (res.error) {
          return this.setState({
            alertShow: true,
            alertType: 'error',
            alertTitle: intl.formatMessage({id: 'error'}),
            alertMssg: res.error
          })
        }
      })
    }
  }
}

export default injectIntl(connect(mapStateToProps)(Tenants));
