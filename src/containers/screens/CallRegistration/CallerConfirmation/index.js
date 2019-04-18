import React, {Component} from 'react'
import { FormattedMessage, connect } from 'lib'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import Textbox from 'components/Textbox'
import DropdownList from 'components/DropdownList'
import Button from 'components/Button'
import Loader from 'components/Loader'

import { verifyCompanyPassword } from 'actions/companies'

import style from './index.scss'

const mapStateToProps = (state) => ({
  myEmail: getState().user.email,
})

class CallerConfirmation extends Component {

  constructor(props) {
    super(props)
    this.state = {
      introducedCompanyPassword: '',
      showLoader: false
    }
  }

  componentDidMount() {
    if((navigator.userAgent.search('Chrome') === -1) &&
      (navigator.userAgent.search('Safari') === -1))
    {
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

            this.setState({ introducedCompanyPassword: inputValue })
          }
      });
    }
  }

  render() {

    const { introducedCompanyPassword = '', showLoader = false } = this.state

    const browserMozilla = ((navigator.userAgent.search('Chrome') === -1) &&
      (navigator.userAgent.search('Safari') === -1))

    return (
      <div className='callerConfirmation'>
        <div className='form-field form-field-password'>
          <div className={'labelContainer ' + (browserMozilla ? 'labelContainer-password' : '')}>
            <FormattedMessage id='password' />
            <FontAwesomeIcon className={'callRegistrationIcon ' + (browserMozilla ? 'iconOnMozilla' : '')} icon="key" />
          </div>
          {
            (browserMozilla) ?
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
                onChange={(value, name) => this.setState({introducedCompanyPassword: value})}
              />

          }
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
    )
  }

  createCaller() {
    const { companyId, onSuccess } = this.props
    const { introducedCompanyPassword = '' } = this.state

    this.setState({ showLoader: true })

    verifyCompanyPassword(companyId, introducedCompanyPassword)
      .then((r) => {
        this.setState({ showLoader: false })
        if(!r) {
          alert('The password is wrong! Please introduce it again!')
          return
        }
        onSuccess && onSuccess()
      })
  }
}

export default CallerConfirmation;
