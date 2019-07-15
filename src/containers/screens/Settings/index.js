import React, {Component} from 'react'
import { FormattedMessage, connect } from 'lib'
import { injectIntl } from 'react-intl'
import Simplert from 'react-simplert'

import DropdownList from 'components/DropdownList'
import Button from 'components/Button'
import Textbox from 'components/Textbox'

import styles from './index.scss'
import { lang } from 'selectors/user'

import { setLocale } from 'actions/intl'
import { changePassword } from 'actions/user'

const mapStateToProps = (state) => ({
  language: lang()
})

class Settings extends Component {

  constructor(props) {
    super(props)
    this.state = {
      introducedNewPassword: '',
      introducedCurrentPassword: '',
      introducedConfirmNewPassword: '',
      showLoader: false,
      alertShow: false,
      alertType: '',
      alertTitle: '',
      alertMssg: ''
    }
    this.handleResetPassword = this.handleResetPassword.bind(this)
  }

  componentDidMount() {
    if((navigator.userAgent.search('Chrome') === -1) &&
      (navigator.userAgent.search('Safari') === -1))
    {
      // if not Chrome
      // clear the password textbox
      $("#current-password-fake").val("");
      $("#new-password-fake").val("");
      $("#confirm-new-password-fake").val("");
      // clear the fake div
      $(".fake-input-currentPass").text("");
      $(".fake-input-newPass").text("");
      $(".fake-input-confNewPass").text("");

      // anytime the user clicks into the password textbox, the div should have a shadow
      $("#current-password-fake").on("click", () => {
        $('.fake-input-currentPass').addClass('typingIn');
      });
      $("#new-password-fake").on("click", () => {
        $('.fake-input-newPass').addClass('typingIn');
      });
      $("#confirm-new-password-fake").on("click", () => {
        $('.fake-input-confNewPass').addClass('typingIn');
      });

      // anytime the user leaves the password textbox, the div should remove the shadow
      $("#current-password-fake").on("focusout", () => {
        $('.fake-input-currentPass').removeClass('typingIn');
      });
      $("#new-password-fake").on("focusout", () => {
        $('.fake-input-newPass').removeClass('typingIn');
      });
      $("#confirm-new-password-fake").on("focusout", () => {
        $('.fake-input-confNewPass').removeClass('typingIn');
      });

      // anytime the user writes into the password textbox and the Browser is not Chrome
      $("#current-password-fake").on("input", () => {

        if(navigator.userAgent.search('Chrome') == -1) {
          // get the textbox introduced value
          const inputValue = $('#current-password-fake').val();
          // and write disc icons in the fake div for each character from password textbox
          const numChars = inputValue.length;
          let showText = "";
          for (let i = 0; i < numChars; i++) {
            showText += "&#8226;";
          }
          $('.fake-input-currentPass').html(showText);

          this.setState({ introducedCurrentPassword: inputValue })
        }
      });

     $("#new-password-fake").on("input", () => {

        if(navigator.userAgent.search('Chrome') == -1) {
          // get the textbox introduced value
          const inputValue = $('#new-password-fake').val();
          // and write disc icons in the fake div for each character from password textbox
          const numChars = inputValue.length;
          let showText = "";
          for (let i = 0; i < numChars; i++) {
            showText += "&#8226;";
          }
          $('.fake-input-newPass').html(showText);

          this.setState({ introducedNewPassword: inputValue })
        }
      });
      $("#confirm-new-password-fake").on("input", () => {

        if(navigator.userAgent.search('Chrome') == -1) {
          // get the textbox introduced value
          const inputValue = $('#confirm-new-password-fake').val();
          // and write disc icons in the fake div for each character from password textbox
          const numChars = inputValue.length;
          let showText = "";
          for (let i = 0; i < numChars; i++) {
            showText += "&#8226;";
          }
          $('.fake-input-confNewPass').html(showText);

          this.setState({ introducedConfirmNewPassword: inputValue })
        }
      });
    }
  }

  render() {
    const { language = 'en' } = this.props

    const {
      introducedNewPassword = '',
      introducedCurrentPassword = '',
      introducedConfirmNewPassword = '',
      showLoader = false,
      alertShow = false,
      alertType = 'info',
      alertTitle = 'Title',
      alertMssg = 'No message'
    } = this.state

    const browserMozilla = ((navigator.userAgent.search('Chrome') === -1) &&
      (navigator.userAgent.search('Safari') === -1))

    return (
      <div className='settings'>
        <div className='form-field sectionTitle'>
          <FormattedMessage id='language' />
          <DropdownList
            name={'languageDropdownList'}
    	      dataSource={
              [
                { id: 'en', name: "English" },
                { id: 'ro', name: "Romanian" }
        	    ]
            }
            value={language}
            dataTextField={'name'}
            dataValueField={'id'}
            onChange={(val, name) => setLocale(val)}
            extraClassName='form-dropdown'
          />
        </div>

        <div className='resetPasswordSection'>

          <div className='form-field sectionTitle'>
            <FormattedMessage id='settings.resetPassword' />
          </div>

          <div className='inputSection'>
            <div className={'overheadInput ' + (browserMozilla ? 'labelContainer-password' : '')}>
              <FormattedMessage id='settings.enterCurrentPassword' />
            </div>
            <div className='inputContainer'>
              {
                (browserMozilla) ?
                  (
                    <div className="input-box">
                       <div className="fake-input-currentPass"></div>
                       <input type="text" className="textField real-input-inForm" id="current-password-fake" ref="password" placeholder="Type to introduce current password" />
                    </div>
                  )
                :
                  <Textbox
                    name={'current-password'}
                    value={introducedCurrentPassword}
                    extraClassName='textField passwordField'
                    placeholder={'Type to introduce current password'}
                    onChange={(value, name) => this.setState({introducedCurrentPassword: value})}
                    specialKey={13}
                    // eventTriggeredWhenSpecialKeyPressed={(value) => this.checkConfirmPassword(value)}
                    autoFocus={true}
                  />

              }
            </div>
          </div>

          <div className='inputSection'>
            <div className={'overheadInput ' + (browserMozilla ? 'labelContainer-password' : '')}>
              <FormattedMessage id='settings.enterNewPassword' />
            </div>
            <div className='inputContainer'>
              {
                (browserMozilla) ?
                  (
                    <div className="input-box">
                       <div className="fake-input-newPass"></div>
                       <input type="text" className="textField real-input-inForm" id="new-password-fake" ref="password" placeholder="Type to introduce new password" />
                    </div>
                  )
                :
                  <Textbox
                    name={'new-password'}
                    value={introducedNewPassword}
                    extraClassName='textField passwordField'
                    placeholder={'Type to introduce new password'}
                    onChange={(value, name) => this.setState({introducedNewPassword: value})}
                    specialKey={13}
                    // eventTriggeredWhenSpecialKeyPressed={() => this.confirmCaller()}
                    autoFocus={true}
                  />

              }
            </div>
          </div>

          <div className='inputSection'>
            <div className={'overheadInput ' + (browserMozilla ? 'labelContainer-password' : '')}>
              <FormattedMessage id='settings.confirmNewPassword' />
            </div>
            <div className='inputContainer'>
              {
                (browserMozilla) ?
                  (
                    <div className="input-box">
                       <div className="fake-input-confNewPass"></div>
                       <input type="text" className="textField real-input-inForm" id="confirm-new-password-fake" ref="password" placeholder="Type to confirm new password" />
                    </div>
                  )
                :
                  <Textbox
                    name={'confirm-new-password'}
                    value={introducedConfirmNewPassword}
                    extraClassName='textField passwordField'
                    placeholder={'Type to confirm new password'}
                    onChange={(value, name) => this.setState({introducedConfirmNewPassword: value})}
                    specialKey={13}
                    // eventTriggeredWhenSpecialKeyPressed={() => this.confirmCaller()}
                    autoFocus={true}
                  />

              }
            </div>
          </div>

        </div>

        <Button
          name={'Reset-Password'}
          primary={true}
          extraClassName={'form-button'}
          onClick={(name) => this.handleResetPassword()}
        >
          <FormattedMessage id='settings.resetPassword' />
        </Button>

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

  /**
  * checkConfirmPassword()
  */
  handleResetPassword() {
    const {
      introducedNewPassword = '',
      introducedConfirmNewPassword = '',
      introducedCurrentPassword = '',
    } = this.state

    if (introducedCurrentPassword === '' || introducedNewPassword === '' || introducedConfirmNewPassword === '') {
      this.setState({
        alertShow: true,
        alertType: 'warning',
        alertTitle: 'Empty',
        alertMssg: 'There are at least one empty input',
      })
    } else if (introducedNewPassword === introducedConfirmNewPassword) {
      changePassword(introducedCurrentPassword, introducedNewPassword)
      .then((res) => {
        if(typeof res === 'object') {
          this.setState({
            alertShow: true,
            alertType: 'success',
            alertTitle: 'Password changed',
            alertMssg: 'Password has been changed',
          })
        } else {
          this.setState({
            alertShow: true,
            alertType: 'error',
            alertTitle: res,
            alertMssg: res,
          })
        }
      })
    } else {
      this.setState({
        alertShow: true,
        alertType: 'error',
        alertTitle: 'Discrepancy',
        alertMssg: 'Passwords does not match',
      })
    }
  }

}

export default connect(mapStateToProps)(Settings);
