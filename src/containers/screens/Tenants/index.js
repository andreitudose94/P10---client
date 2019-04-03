import React, {Component} from 'react'
import {connect} from 'react-redux'

import styles from './index.scss'
import Card from './Card'
import Modal from '../../../components/Modal'
import {
  createTenant,
  deleteTenant,
  setActiveTenant,
} from '../../../actions/user'

import Tooltip from '../../../components/Tooltip'

const mapStateToProps = (state) => ({
  primaryTenant: getState().user.primaryTenant,
  activeTenant: getState().user.activeTenant,
  tenants: getState().user.tenantsList
})

class Tenants extends Component {

  constructor(props) {
    super(props)
    this.state = {
      showModal: false,
    }
    this.createTenant = this.createTenant.bind(this)
    this.deleteTenant = this.deleteTenant.bind(this)
    this.handleCloseModal = this.handleCloseModal.bind(this)
  }

  render() {
    const {
      primaryTenant = '',
      activeTenant = '',
      tenants = []
    } = this.props

    const { showModal } = this.state

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
          onSelect={this.createTenant}
        />

        <Modal
          visible={showModal}
          onClose={this.handleCloseModal}
          title={'Create Tenant'}
        >
          text
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

  createTenant() {
    console.log('create');
    this.setState({showModal: true})
    // createTenant(
    //   {
    //     "title": "andrei.tudose@pacosoftware.com-New Tenant2",
    //     "description": "This tenant has been created automatically by the app"
    //   }
    // )
  }

  deleteTenant(tenant) {
    deleteTenant(tenant)
  }
}

export default connect(mapStateToProps)(Tenants);
