import React, {Component} from 'react'
import { FormattedMessage, connect } from 'lib'
import { injectIntl } from 'react-intl'
import Simplert from 'react-simplert'

import Button from 'components/Button'
import Textbox from 'components/Textbox'
import DropdownList from 'components/DropdownList'
import Loader from 'components/Loader'

import styles from './index.scss'

import { createCompany } from 'actions/companies'

const mapStateToProps = (state) => ({
  myPrimaryTenant: getState().user.primaryTenant,
  myActiveTenant: getState().user.activeTenant,
  myEmail: getState().user.email,
  myRole: getState().user.role,
})

class NewCompany extends Component {

  constructor(props) {
    super(props)
    const { myActiveTenant = '', myEmail = '' } = props
    this.state = {
      showModal: false,
      showLoader: false,
      name: '',
      email: '',
      address: '',
      alertShow: false,
      alertType: '',
      alertTitle: '',
      alertMssg: ''
    }

    this.createCompany = this.createCompany.bind(this)
  }

  render() {

    const {
      intl = {},
      myPrimaryTenant = '',
      myActiveTenant = '',
      myEmail = '',
      myRole = ''
    } = this.props

    const {
      showModal = false,
      showLoader = false,
      name = '',
      email = '',
      address = '',
      alertShow = false,
      alertType = 'info',
      alertTitle = 'Title',
      alertMssg = 'No message'
    } = this.state

    return (
      <div className='newCompany'>

        <Simplert
          showSimplert={alertShow}
          type={alertType}
          title={alertTitle}
          message={alertMssg}
          onClose={() => this.setState({alertShow: false})}
        />

        <div className='form-field'>
          <FormattedMessage id='companyName' />
          <Textbox
            name={'create-company-name'}
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
            name={'create-company-email'}
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
          <FormattedMessage id='address' />
          <Textbox
            name={'create-company-address'}
            value={address}
            extraClassName='textField'
            placeholder={
              intl.formatMessage({
                id: 'address'
              })
            }
            onChange={(value, name) => this.setState({address: value})}
          />
        </div>

        <center>
          <Button
            name={'Save-Company'}
            enable={true}
            icon={'save'}
            primary={true}
            extraClassName={'form-button'}
            onClick={(name) => this.createCompany()}
          >
            <FormattedMessage id='save' />
          </Button>
        </center>

        <Loader show={showLoader} />
      </div>
    )
  }

  createCompany() {

    const {
      myPrimaryTenant = '',
      myActiveTenant = '',
      onCloseModal,
      onFetchCompanies,
    } = this.props

    const {
      name = '',
      email = '',
      address = ''
    } = this.state

    this.setState({ showLoader: true })

    return createCompany({
      name,
      email,
      address,
      primaryTenant: myPrimaryTenant,
      activeTenant: myActiveTenant
    })
      .then((res) => {
        if(res.error){
          this.setState({
            alertShow: true,
            alertType: 'error',
            alertTitle: 'Error',
            alertMssg: res.error,
            showLoader: false,
          })
        } else {
          onFetchCompanies && onFetchCompanies()
          onCloseModal && onCloseModal()
          return this.setState({
            showModal: false,
            showLoader: false,
            name: '',
            email: '',
            address: ''
          })
        }
      })
  }
}

export default injectIntl(connect(mapStateToProps)(NewCompany));
