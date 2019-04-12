import React, {Component} from 'react'
import { FormattedMessage, connect } from 'lib'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import Textbox from 'components/Textbox'
import DropdownList from 'components/DropdownList'
import Button from 'components/Button'

import { getCompanies } from 'actions/companies'

import style from './index.scss'

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
      introducedName: ''
    }
  }

  componentDidMount() {
    if(navigator.userAgent.search('Chrome') === -1){
      $("#pas2").val("");
      $(".fake-input-inForm").text("");
      $("#pas2").on("click", function() {
        $('.fake-input-inForm').addClass('typingIn');
      });
      $("#pas2").on("focusout", function() {
        $('.fake-input-inForm').removeClass('typingIn');
      });
       $("#pas2").on("input", function() {
          if(navigator.userAgent.search('Chrome') == -1) {
            const inputValue = $('#pas2').val();
            const numChars = inputValue.length;
            let showText = "";
            for (let i = 0; i < numChars; i++) {
              showText += "&#8226;";
            }
            $('.fake-input-inForm').html(showText);
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
      introducedName = ''
    } = this.state

    const browserMozilla = (navigator.userAgent.search('Chrome') === -1)

    return (
      <div className='callerRegistration'>
        <div className='form-field'>
          <FormattedMessage id='company' />
          <DropdownList
            name={'callerConfirm-companiesDropdownList'}
    	      dataSource={companies}
            value={selectedCompany}
            dataTextField={'name'}
            dataValueField={'_id'}
            filter={'contains'}
            searchPlaceholder='Company'
            onChange={(val, name) => this.setState({selectedCompany: val})}
            extraClassName='form-dropdown'
          />
        </div>

        <div className='form-field form-field-password'>
          <div className={'labelContainer ' + (browserMozilla && 'labelContainer-password')}>
            <FormattedMessage id='password' />
            <FontAwesomeIcon className={'callRegistrationIcon' + browserMozilla && 'iconOnMozilla'} icon="key" />
          </div>
          {
            browserMozilla ?
              (
                <div className="input-box">
                   <div className="fake-input-inForm"></div>
                   <input type="text" className="textField real-input-inForm" id="pas2" ref="password" placeholder="Type to introduce company password" />
                </div>
              )
            :
              <Textbox
                name={'new-caller-company-password'}
                value={introducedCompanyPassword}
                extraClassName='textField passwordField'
                placeholder={'Type to introduce company password'}
                onChange={(value, name) => this.setState({introducedCompanyPassword: value})}
              />

          }
        </div>

        <div className='form-field'>
          <div className='labelContainer'>
            <FormattedMessage id='name' />
            <FontAwesomeIcon className='callRegistrationIcon' icon="key" />
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
            <span>SSN</span>
            <FontAwesomeIcon className='callRegistrationIcon' icon="key" />
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
      </div>
    )
  }

  createCaller() {
    alert('daaaaaa')
  }
}

export default CallerRegistration;
