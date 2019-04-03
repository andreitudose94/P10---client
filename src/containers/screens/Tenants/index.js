import React, {Component} from 'react'
import {connect} from 'react-redux'
import { FormattedMessage } from '../../../lib'

import styles from './index.scss'
import Card from './Card'
import Modal from '../../../components/Modal'
import {
  createTenant,
  deleteTenant,
  setActiveTenant,
  getUserEmail
} from '../../../actions/user'

import Tooltip from '../../../components/Tooltip'
import Textbox from '../../../components/Textbox'
import Button from '../../../components/Button'

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
  }

  render() {
    const {
      primaryTenant = '',
      activeTenant = '',
      tenants = []
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
              tenant={t}
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
          <div>
            <FormattedMessage id='Title' />
            <Textbox
              name={'title'}
              value={tenantTitle}
              placeholder={'Title'}
              onChange={(value, name) => {
                console.log(value, name)
                this.setState({tenantTitle: value})
              }}
            />
          </div>
          <div>
            <FormattedMessage id='description' />
            <textarea type="text" ref="description" placeholder="Type to add call summary"></textarea>
          </div>
          <Button
            name={'Save'}
            enable={true}
            icon={'save'}
            primary={true}
            onClick={(name) => this.createTenant()}
          >
            My special Button
          </Button>
        </Modal>
      </div>
    )
  }

  handleCloseModal() {
    this.setState({showModal: false})
  }

  activateTenant(tenant) {
    setActiveTenant(tenant.title)
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
        .then(()=> this.setState({showModal: false}))

    } else {
      alert('Please fill in the filelds!')
    }

  }

  deleteTenant(tenant) {
    deleteTenant(tenant)
  }
}

export default connect(mapStateToProps)(Tenants);
