import React, {Component} from 'react'
import {connect} from 'react-redux'
import { FormattedMessage } from 'lib'
import { injectIntl } from 'react-intl'
import Simplert from 'react-simplert'

import styles from './index.scss'

import {
  createTenant,
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

class NewTenant extends Component {

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
    this.createTenant = this.createTenant.bind(this)
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
      <div className='newTenants'>
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
          <textarea type="text" ref="description" placeholder="Type to add some description"></textarea>
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
            <FormattedMessage id='save' />
          </Button>
        </center>

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

  createTenant() {
    const { email, tenants = [], intl = {}, onCloseModal } = this.props
    const {
      tenantTitle,
      alertShow = false,
      alertType = 'info',
      alertTitle = 'Title',
      alertMssg = 'No message'
    } = this.state
    const description = this.refs.description.value

    if (tenantTitle !== '' && description !== '') {

      if(tenantTitle.indexOf('$') !== -1) {
        onCloseModal && onCloseModal()
        return this.setState({
          alertShow: true,
          alertType: 'warning',
          alertTitle: intl.formatMessage({id: 'warning'}),
          alertMssg: intl.formatMessage({id: 'unauthorizedUseOfSigns'}),
        })
      }

      if(tenantTitle === 'default') {
        onCloseModal && onCloseModal()
        return this.setState({
          alertShow: true,
          alertType: 'warning',
          alertTitle: intl.formatMessage({id: 'warning'}),
          alertMssg: intl.formatMessage({id: 'defaultTenantNameAlreadyUsed'}),
        })
      }

      for(let i = 0 ; i < tenants.length ; i ++) {
        if(getTenantSuffix(tenants[i].title) === tenantTitle) {
          onCloseModal && onCloseModal()
          return this.setState({
            alertShow: true,
            alertType: 'warning',
            alertTitle: intl.formatMessage({id: 'warning'}),
            alertMssg: intl.formatMessage({id: 'tenantNameAlreadyUsed'}),
          })
        }
      }

      createTenant({
        "title": email + '$' + tenantTitle,
        "description": description
      })
        .then((res) => {
          if (res.error) {
            onCloseModal && onCloseModal()
            return this.setState({
              alertShow: true,
              alertType: 'warning',
              alertTitle: intl.formatMessage({id: 'error'}),
              alertMssg: res.error,
            })
          }
          this.refs.description.value = ''
          this.setState({
            tenantTitle: '',
            showModal: false
          })
          onCloseModal && onCloseModal()
        })

    } else {

      onCloseModal && onCloseModal()
      return this.setState({
        alertShow: true,
        alertType: 'warning',
        alertTitle: intl.formatMessage({id: 'error'}),
        alertMssg: intl.formatMessage({id: 'fillTheFields'}),
      })
    }

  }
}

export default injectIntl(connect(mapStateToProps)(NewTenant));
