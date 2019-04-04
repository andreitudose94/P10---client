import React, {Component} from 'react'
import {connect} from 'react-redux'
import { FormattedMessage } from 'lib'

import styles from './index.scss'
import Card from './Card'
import Modal from 'components/Modal'
import {
  createTenant,
  deleteTenant,
  setActiveTenant,
  getUserEmail
} from 'actions/user'

import Textbox from 'components/Textbox'
import Button from 'components/Button'

// e.g. preffix = pacosoftware.com-
const getTenantSuffix = (tenantName, preffix) => {
  return tenantName.substr(tenantName.indexOf(preffix) + preffix.length + ('-').length)
}

const mapStateToProps = (state) => ({
  primaryTenant: getState().user.primaryTenant,
  activeTenant: getState().user.activeTenant,
  tenants: getState().user.tenantsList,
  email: getState().user.email,
})

class Tenants extends Component {

  constructor(props) {
    super(props)
    this.state = {
      showModal: false,
      tenantTitle: ''
    }
    this.openModal = this.openModal.bind(this)
    this.deleteTenant = this.deleteTenant.bind(this)
    this.handleCloseModal = this.handleCloseModal.bind(this)
    this.createTenant = this.createTenant.bind(this)
    this.activateTenant = this.activateTenant.bind(this)
  }

  render() {
    const {
      primaryTenant = '',
      activeTenant = '',
      tenants = [],
      email = ''
    } = this.props

    const { showModal, tenantTitle } = this.state

    return (
      <div className='tenants'>
        {
          tenants.map((t) => (
            <Card
              key={t.title}
              active={t.title === activeTenant}
              deletable={t.title !== primaryTenant}
              tenant={{
                ...t,
                title: getTenantSuffix(t.title, email),
              }}
              onSelect={this.activateTenant}
              onDelete={this.deleteTenant}
            />
          ))
        }

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

        <Modal
          visible={showModal}
          onClose={this.handleCloseModal}
          title={'Create Tenant'}
        >
          <div className='form-field'>
            <FormattedMessage id='title' />
            <Textbox
              name={'title'}
              value={tenantTitle}
              extraClassName='textField'
              placeholder={'Title'}
              onChange={(value, name) => this.setState({tenantTitle: value})}
            />
          </div>
          <div className='form-field'>
            <FormattedMessage id='description' />
            <textarea type="text" ref="description" placeholder="Type to add call summary"></textarea>
          </div>
          <center>
            <Button
              name={'Save'}
              enable={true}
              icon={'save'}
              primary={true}
              extraClassName={'form-button'}
              onClick={(name) => this.createTenant()}
            >
              Create
            </Button>
          </center>
        </Modal>
      </div>
    )
  }

  handleCloseModal() {
    this.setState({showModal: false})
  }

  activateTenant(tenant) {
    const { email } = this.props
    setActiveTenant(email + '-' + tenant.title)
  }

  openModal() {
    this.setState({showModal: true})
  }

  createTenant() {
    const { email } = this.props
    const { tenantTitle } = this.state
    const description = this.refs.description.value

    if (tenantTitle !== '' && description !== '') {

      createTenant({
        "title": email + '-' + tenantTitle,
        "description": description
      })
        .then(() => {
          this.refs.description.value = ''
          this.setState({
            tenantTitle: '',
            showModal: false
          })
        })

    } else {
      alert('Please fill in the filelds!')
    }

  }

  deleteTenant(tenant) {
    const { email = '' } = this.props
    const r = confirm('Are you sure you want to remove the ' + tenant.title + ' tenant? This opperation will automatically delete all the data registered in this tenant and will not be able to be revoked later!')
    if(r) {
      deleteTenant({
        ...tenant,
        title: email + '-' + tenant.title,
      })
    }
  }
}

export default connect(mapStateToProps)(Tenants);
