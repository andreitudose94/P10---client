import React, {Component} from 'react'
import { FormattedMessage, connect } from 'lib'
import { injectIntl } from 'react-intl'
import Simplert from 'react-simplert'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import Button from 'components/Button'
import Textbox from 'components/Textbox'
import DropdownList from 'components/DropdownList'
import MultiSelect from 'components/MultiSelect'
import Loader from 'components/Loader'

import styles from './index.scss'

import { createUser } from 'actions/user'

class NewUser extends Component {

  constructor(props) {
    super(props)
    const { myActiveTenant } = props
    this.state ={
      name: '',
      email: '',
      role: '',
      selectedTenants: [myActiveTenant],
      showLoader: false,
      alertShow: '',
      alertType: '',
      alertTitle: '',
      alertMssg: '',
      alertShow: false
    }

    this.createUser = this.createUser.bind(this)
  }

  render() {

    const {
      name,
      email,
      role,
      selectedTenants,
      showLoader,
      alertShow,
      alertType,
      alertTitle,
      alertMssg,
    } = this.state

    const {
      intl = {},
      companies = [],
      onCreateTenantsDS,
      myTenants = '',
      myActiveTenant = '',
    } = this.props

    return (
      <div className='callers'>
        <div className='form-field'>
          <FormattedMessage id='username' />
          <Textbox
            name={'create-user-name'}
            value={name}
            extraClassName='textField'
            placeholder={
              intl.formatMessage({
                id: 'name'
              })
            }
            onChange={(value, name) => this.setState({name: value})}
          />
        </div>
        <div className='form-field'>
          <FormattedMessage id='email-address' />
          <Textbox
            name={'create-user-email'}
            value={email}
            extraClassName='textField'
            placeholder={
              intl.formatMessage({
                id: 'email'
              })
            }
            onChange={(value, name) => this.setState({email: value})}
          />
        </div>
        <div className='form-field'>
          <FormattedMessage id='role' />
          <DropdownList
            name={'create-user-role'}
            dataSource={[
              { id: '', name: "-- Select role --"},
              { id: 'Admin', name: "Admin" },
              { id: 'User', name: "User" },
              { id: 'Guest', name: "Guest" }
            ]}
            value={role}
            dataTextField={'name'}
            dataValueField={'id'}
            onChange={(value, name) => this.setState({role: value})}
            extraClassName='form-dropdown'
          />
        </div>
        <div className='form-field create-user-tenants-row'>
          <FormattedMessage id='tenants' />
          <MultiSelect
            name={'create-user-tenants'}
            dataSource={onCreateTenantsDS(myTenants)}
            value={selectedTenants}
            dataTextField={'titleDisplay'}
            dataValueField={'title'}
            enable={true}
            onSelect={(e, selected, name) => {
              if(selected.title === myActiveTenant) {
                e.preventDefault()
              }
            }}
            onDeselect={(e, selected, name) => {
              if(selected.title === myActiveTenant) {
                e.preventDefault()
              }
            }}
            onChange={(value, name) => this.setState({selectedTenants: value})}
            filter={'startsWith'}
            ignoreCase={false}
            clearButton={true}
            autoWidth={true}
          />
        </div>

        <center>
          <Button
            name={'Save-NewUser'}
            enable={true}
            icon={'save'}
            primary={true}
            extraClassName={'form-button'}
            onClick={(name) => this.createUser()}
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

        <Loader show={showLoader} />
      </div>
    )
  }

  createUser() {

    const {
      myPrimaryTenant = '',
      myActiveTenant = '',
      myTenants = '',
      myEmail = '',
      getPrelucratedUsers,
      onCloseModal,
    } = this.props

    const {
      name = '',
      email = '',
      role = 'User',
      selectedTenants = [],
    } = this.state

    this.setState({ showLoader: true })

    const newUserTenants = selectedTenants.map((t) => {
      return myTenants.find((mT) => mT.title === t)
    })

    return createUser({
      name,
      email,
      role,
      primaryTenant: myPrimaryTenant,
      activeTenant: myActiveTenant,
      tenantsList: newUserTenants
    })
      .then((res) => {
        if (res.error) {
          return this.setState({
            alertShow: true,
            alertType: 'error',
            alertTitle: 'Error',
            alertMssg: res.error,
            showLoader: false,
          })
        } else {
          getPrelucratedUsers && getPrelucratedUsers()
          onCloseModal && onCloseModal()
          return this.setState({
            showLoader: false,
            name: '',
            email: '',
            role: 'User',
            selectedTenants: [myActiveTenant]
          })
        }
      })
  }

}

export default injectIntl(NewUser);
