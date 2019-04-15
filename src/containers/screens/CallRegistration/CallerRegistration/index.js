import React, {Component} from 'react'
import { FormattedMessage, connect } from 'lib'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import Textbox from 'components/Textbox'
import DropdownList from 'components/DropdownList'
import Button from 'components/Button'
import Loader from 'components/Loader'

import { getCompanies, verifyCompanyPassword } from 'actions/companies'
import { createCaller } from 'actions/callers'

import styles from './index.scss'

const mapStateToProps = (state) => ({
  myPrimaryTenant: getState().user.primaryTenant,
  myActiveTenant: getState().user.activeTenant,
  myEmail: getState().user.email,
  myRole: getState().user.role,
})

class CallerRegistration extends Component {

  constructor(props) {
    super(props)
    this.state = {
      companies: [],
      selectedCompany: null,
      introducedCompanyPassword: '',
      introducedSSN: '',
      introducedName: '',
      passwordIsValidated: false,
      showLoader: false
    }
  }

  componentDidMount() {
    if(navigator.userAgent.search('Chrome') === -1){
      // if not Chrome
      // clear the password textbox
      $("#new-caller-company-password-fake").val("");
      // clear the fake div
      $(".fake-input-inForm").text("");

      // anytime the user clicks into the password textbox, the div should have a shadow
      $("#new-caller-company-password-fake").on("click", () => {
        $('.fake-input-inForm').addClass('typingIn');
      });

      // anytime the user leaves the password textbox, the div should remove the shadow
      $("#new-caller-company-password-fake").on("focusout", () => {
        $('.fake-input-inForm').removeClass('typingIn');
      });

      // anytime the user writes into the password textbox and the Browser is not Chrome
       $("#new-caller-company-password-fake").on("input", () => {

          if(navigator.userAgent.search('Chrome') == -1) {
            // get the textbox introduced value
            const inputValue = $('#new-caller-company-password-fake').val();
            // and write disc icons in the fake div for each character from password textbox
            const numChars = inputValue.length;
            let showText = "";
            for (let i = 0; i < numChars; i++) {
              showText += "&#8226;";
            }
            $('.fake-input-inForm').html(showText);

            this.setState({ introducedCompanyPassword: inputValue, passwordIsValidated: false })
          }
      });
    }

    getCompanies()
      .then((companies) => this.setState({ companies }))
  }

  render() {

    const {
      myPrimaryTenant = '',
      myActiveTenant = '',
      myEmail = '',
      myRole = ''
    } = this.props

    const {
      companies = [],
      selectedCompany = null,
      introducedCompanyPassword = '',
      introducedSSN = '',
      introducedName = '',
      passwordIsValidated = false,
      showLoader = false
    } = this.state

    const browserMozilla = (navigator.userAgent.search('Chrome') === -1)

    return (
      <div className='callerRegistration'>
        <div className='form-field'>
          <div className='labelContainer'>
            <FormattedMessage id='company' />
            <FontAwesomeIcon className='callRegistrationIcon' icon="building" />
          </div>
          <DropdownList
            name={'callerConfirm-companiesDropdownList'}
    	      dataSource={companies}
            value={selectedCompany}
            dataTextField={'name'}
            dataValueField={'_id'}
            filter={'contains'}
            searchPlaceholder='Company'
            onChange={(val, name) => this.setState({selectedCompany: val, passwordIsValidated: false})}
            extraClassName='form-dropdown'
          />
        </div>

        <div className='form-field form-field-password'>
          <div className={'labelContainer ' + (browserMozilla ? 'labelContainer-password' : '')}>
            <FormattedMessage id='password' />
            <FontAwesomeIcon className={'callRegistrationIcon' + (browserMozilla ? ' iconOnMozilla' : '')} icon="key" />
          </div>
          {
            browserMozilla ?
              (
                <div className="input-box">
                   <div className="fake-input-inForm"></div>
                   <input type="text" className="textField real-input-inForm" id="new-caller-company-password-fake" ref="password" placeholder="Type to introduce company password" />
                </div>
              )
            :
              <Textbox
                name={'new-caller-company-password'}
                value={introducedCompanyPassword}
                extraClassName='textField passwordField'
                placeholder={'Type to introduce company password'}
                onChange={(value, name) => this.setState({introducedCompanyPassword: value, passwordIsValidated: false})}
              />

          }
        </div>

        {
          !passwordIsValidated &&
            <center>
              <Button
                name={'Verify-Company-Password-New-Caller'}
                enable={selectedCompany && introducedCompanyPassword}
                icon={'check'}
                primary={true}
                extraClassName={'form-button'}
                onClick={(name) => this.verifyCompanyPassword()}
              >
                <FormattedMessage id='verifypassword' />
              </Button>
            </center>
        }

        {
          passwordIsValidated &&
            <div>
              <div className='form-field'>
                <div className='labelContainer'>
                  <FormattedMessage id='name' />
                  <FontAwesomeIcon className='callRegistrationIcon' icon="user" />
                </div>
                <Textbox
                  name={'new-caller-name'}
                  value={introducedName}
                  extraClassName='textField'
                  placeholder={'Type to introduce the caller\'s name'}
                  onChange={(value, name) => this.setState({introducedName: value})}
                />
              </div>

              <div className='form-field'>
                <div className='labelContainer'>
                  <FormattedMessage id='ssn-described' />
                  <FontAwesomeIcon className='callRegistrationIcon' icon="id-card" />
                </div>
                <Textbox
                  name={'new-caller-ssn'}
                  value={introducedSSN}
                  extraClassName='textField'
                  placeholder={'Type to introduce the ssn'}
                  onChange={(value, name) => this.setState({introducedSSN: value})}
                />
              </div>

              <center>
                <Button
                  name={'Save-New-Caller'}
                  enable={true}
                  icon={'save'}
                  primary={true}
                  extraClassName={'form-button'}
                  onClick={(name) => this.createCaller()}
                >
                  <FormattedMessage id='save' />
                </Button>
              </center>

              <Loader show={showLoader} />
            </div>
        }
      </div>
    )
  }

  createCaller() {
    const {
      companies = [],
      selectedCompany = null,
      introducedCompanyPassword = '',
      introducedSSN = '',
      introducedName = ''
    } = this.state

    const {
      myPrimaryTenant = '',
      myActiveTenant = '',
      myEmail = '',
      myRole = ''
    } = this.props

    this.setState({ showLoader: true })

    const selectedCompanyName = companies.find((c) => c._id === selectedCompany).name

    createCaller({
      name: introducedName,
      ssn: introducedSSN,
      company: selectedCompanyName,
      companyId: selectedCompany,
      primaryTenant: myPrimaryTenant,
      activeTenant: myActiveTenant
    })
      .then((caller) => {
        this.setState({ showLoader: false })
        this.props.onSuccess(caller)
      })
  }

  verifyCompanyPassword() {

    const {
      selectedCompany = null,
      introducedCompanyPassword = ''
    } = this.state

    this.setState({ showLoader: true })

    verifyCompanyPassword(selectedCompany, introducedCompanyPassword)
      .then((valid) => {

        this.setState({ showLoader: false })

        if(!valid) {
          alert('Password for selected company is wrong! Please try another password!')
        }
        this.setState({ passwordIsValidated: valid })
      })
  }
}

export default CallerRegistration;
