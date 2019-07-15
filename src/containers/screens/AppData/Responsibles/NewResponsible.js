import React, {Component} from 'react'
import { FormattedMessage, connect } from 'lib'
import { injectIntl } from 'react-intl'
import Simplert from 'react-simplert'

import Button from 'components/Button'
import Textbox from 'components/Textbox'
import DropdownList from 'components/DropdownList'
import Loader from 'components/Loader'

import styles from './index.scss'

import { createResponsible } from 'actions/responsibles'

const mapStateToProps = (state) => ({
  myPrimaryTenant: getState().user.primaryTenant,
  myActiveTenant: getState().user.activeTenant,
  myEmail: getState().user.email,
  myRole: getState().user.role,
})

class NewResponsible extends Component {

  constructor(props) {
    super(props)
    const { myActiveTenant = '', myEmail = '' } = props
    this.state = {
      showModal: false,
      showLoader: false,
      name: '',
      email: '',
      phoneNo: '',
      alertShow: false,
      alertType: '',
      alertTitle: '',
      alertMssg: ''
    }
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
      showLoader = false,
      name = '',
      email = '',
      phoneNo = '',
      alertShow = false,
      alertType = 'info',
      alertTitle = 'Title',
      alertMssg = 'No message'
    } = this.state

    return (
      <div className='newResponsible'>

        <Simplert
          showSimplert={alertShow}
          type={alertType}
          title={alertTitle}
          message={alertMssg}
          onClose={() => this.setState({alertShow: false})}
        />

        <div className='form-field'>
          <FormattedMessage id='name' />
          <Textbox
            name={'create-responsible-name'}
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
            name={'create-responsible-email'}
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
          <FormattedMessage id='phoneNo' />
          <Textbox
            name={'create-responsible-phone'}
            value={phoneNo}
            extraClassName='textField'
            placeholder={
              intl.formatMessage({
                id: 'phoneNo'
              })
            }
            onChange={(value, name) => this.setState({phoneNo: value})}
          />
        </div>

        <center>
          <Button
            name={'Save-Responsible'}
            enable={true}
            icon={'save'}
            primary={true}
            extraClassName={'form-button'}
            onClick={(name) => this.createResponsible()}
          >
            <FormattedMessage id='save' />
          </Button>
        </center>
        <Loader show={showLoader} />
      </div>
    )
  }

  createResponsible() {

    const {
      myPrimaryTenant = '',
      myActiveTenant = '',
      onFetchResponsibles,
      onCloseModal,
    } = this.props

    const {
      name = '',
      email = '',
      phoneNo = ''
    } = this.state

    this.setState({ showLoader: true })

    createResponsible({
      name,
      email,
      phoneNo
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
        }
        else {
          onFetchResponsibles()
          onCloseModal()
          this.setState({ showLoader: false, name: '', email: '', phoneNo: '' })
        }
     })
  }
}

export default injectIntl(connect(mapStateToProps)(NewResponsible));
