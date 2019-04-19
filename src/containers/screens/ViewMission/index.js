import React, {Component} from 'react'
import { FormattedMessage, connect } from 'lib'
import moment from 'moment'
import { Redirect } from 'react-router-dom';

import PlacesAutocomplete from 'react-places-autocomplete';
import  { geocodeByAddress, getLatLng } from 'react-places-autocomplete';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { injectIntl } from 'react-intl'

import DropdownList from 'components/DropdownList'
import Textbox from 'components/Textbox'
import DatePicker from 'components/DatePicker'
import TimePicker from 'components/TimePicker'
import Button from 'components/Button'
import Modal from 'components/Modal'
import SearchLocation from 'components/SearchLocation'
import Loader from 'components/Loader'

import Messages from './Messages'

import { getActiveResponsibles, reserveResponsible, releaseResponsibles } from 'actions/responsibles'
import { getDistances } from 'actions/googleAPIs'
import { createCall } from 'actions/calls'

import styles from './index.scss'

import {
  getCallers
} from 'actions/callers'

class ViewMission extends Component {

  constructor(props) {
    super(props)

    this.state = {
      showMessages: false
    }

    this.openMessages = this.openMessages.bind(this)
    this.closeMessages = this.closeMessages.bind(this)
  }

  render() {

    const { intl = {} } = this.props
    const { showMessages = false } = this.state


    return (
      <div className='viewMission'>
        <div className='form-field'>
          <div className='labelContainer'>
            <FormattedMessage id='callId' />
          </div>
          <Textbox
            name={'externalId'}
            value={'00004'}
            extraClassName='textField readonlyField'
            readOnly={true}
          />
        </div>

        <div className='callRegistrationRow'>
          <div className='form-field dateAndTime col-12 col-sm-6 col-md-6 col-lg-6'>
            <div className='labelContainer'>
              <FormattedMessage id='estimatedStartDate' />
              <FontAwesomeIcon className='callRegistrationIcon' icon="calendar-check" />
            </div>
            <Textbox
              name={'estimatedStartDate'}
              value={'estimatedStartDate'}
              extraClassName='textField readonlyField'
              readOnly={true}
            />
          </div>
          <div className='form-field dateAndTime col-12 col-sm-6 col-md-6 col-lg-6'>
            <div className='labelContainer'>
              <FormattedMessage id='estimatedStartTime' />
              <FontAwesomeIcon className='callRegistrationIcon' icon="clock" />
            </div>
            <Textbox
              name={'estimatedStartTime'}
              value={'estimatedStartTime'}
              extraClassName='textField readonlyField'
              readOnly={true}
            />
          </div>
        </div>

        <div className='callRegistrationRow'>
          <div className='form-field dateAndTime col-12 col-sm-6 col-md-6 col-lg-6'>
            <div className='labelContainer'>
              <FormattedMessage id='effectiveStartDate' />
              <FontAwesomeIcon className='callRegistrationIcon' icon="calendar-check" />
            </div>
            <Textbox
              name={'effectiveStartDate'}
              value={'effectiveStartDate'}
              extraClassName='textField readonlyField'
              readOnly={true}
            />
          </div>
          <div className='form-field dateAndTime col-12 col-sm-6 col-md-6 col-lg-6'>
            <div className='labelContainer'>
              <FormattedMessage id='effectiveStartTime' />
              <FontAwesomeIcon className='callRegistrationIcon' icon="clock" />
            </div>
            <Textbox
              name={'effectiveStartTime'}
              value={'effectiveStartTime'}
              extraClassName='textField readonlyField'
              readOnly={true}
            />
          </div>
        </div>

        <div className='callRegistrationRow'>
          <div className='form-field dateAndTime col-12 col-sm-6 col-md-6 col-lg-6'>
            <div className='labelContainer'>
              <FormattedMessage id='effectiveEndDate' />
              <FontAwesomeIcon className='callRegistrationIcon' icon="calendar-check" />
            </div>
            <Textbox
              name={'effectiveEndDate'}
              value={'effectiveEndDate'}
              extraClassName='textField readonlyField'
              readOnly={true}
            />
          </div>
          <div className='form-field dateAndTime col-12 col-sm-6 col-md-6 col-lg-6'>
            <div className='labelContainer'>
              <FormattedMessage id='effectiveEndTime' />
              <FontAwesomeIcon className='callRegistrationIcon' icon="clock" />
            </div>
            <Textbox
              name={'effectiveEndTime'}
              value={'effectiveEndTime'}
              extraClassName='textField readonlyField'
              readOnly={true}
            />
          </div>
        </div>

        <div className='callRegistrationRow'>
          <div className='form-field dateAndTime col-12 col-sm-6 col-md-6 col-lg-6'>
            <div className='labelContainer'>
              <FormattedMessage id='estimatedEndDate' />
              <FontAwesomeIcon className='callRegistrationIcon' icon="calendar-check" />
            </div>
            <Textbox
              name={'estimatedEndDate'}
              value={'estimatedEndDate'}
              extraClassName='textField readonlyField'
              readOnly={true}
            />
          </div>
          <div className='form-field dateAndTime col-12 col-sm-6 col-md-6 col-lg-6'>
            <div className='labelContainer'>
              <FormattedMessage id='estimatedEndTime' />
              <FontAwesomeIcon className='callRegistrationIcon' icon="clock" />
            </div>
            <Textbox
              name={'estimatedEndTime'}
              value={'estimatedEndTime'}
              extraClassName='textField readonlyField'
              readOnly={true}
            />
          </div>
        </div>

        <div className='form-field'>
          <div className='labelContainer'>
            <FormattedMessage id='assignedResponsible' />
            <FontAwesomeIcon className='callRegistrationIcon' icon="list-ol" />
          </div>
          <Textbox
            name={'estimatedEndTime'}
            value={'estimatedEndTime'}
            extraClassName='textField readonlyField'
            readOnly={true}
          />
        </div>



        <div className='form-field'>
          <div className='labelContainer'>
            <FormattedMessage id='caseSummary' />
            <FontAwesomeIcon className='callRegistrationIcon' icon="comment-alt" />
          </div>
          <textarea className='readonlyField' type="text" ref="description" readOnly>
            {'caseSummary'}
          </textarea>
        </div>

        <div className='form-field'>
          <div className='labelContainer'>
            <FormattedMessage id='contactPerson' />
            <FontAwesomeIcon className='callRegistrationIcon' icon="phone" />
          </div>
          <Textbox
            name={'contactPerson'}
            value={'contactPerson'}
            type='text'
            extraClassName='textField readonlyField'
            readOnly={true}
          />
        </div>

        <div className='form-field'>
          <div className='labelContainer'>
            <FormattedMessage id='contactPerson' />
            <FontAwesomeIcon className='callRegistrationIcon' icon="user" />
          </div>
          <Textbox
            name={'contactPerson'}
            value={'contactPerson'}
            extraClassName='textField readonlyField'
            placeholder={'Type to add contact person'}
            readOnly={true}
          />
        </div>

        <div className='form-field'>
          <div className='labelContainer'>
            <FormattedMessage id='callSumary' />
            <FontAwesomeIcon className='callRegistrationIcon' icon="comment-alt" />
          </div>
          <textarea className='readonlyField' type="text" ref="description" readOnly></textarea>
        </div>

        <div className='form-field'>
          <div className='labelContainer'>
            <FormattedMessage id='callSumary' />
            <FontAwesomeIcon className='callRegistrationIcon' icon="comment-alt" />
          </div>
          <textarea className='readonlyField' type="text" ref="description" readOnly></textarea>
        </div>


        <div className='form-field'>
          <div className='labelContainer'>
            <FormattedMessage id='contactPhone' />
            <FontAwesomeIcon className='callRegistrationIcon' icon="phone" />
          </div>
          <Textbox
            name={'contactPhoneNo'}
            value={'contactPhoneNo'}
            type='tel'
            extraClassName='textField readonlyField'
            placeholder={'Type to add contact phone'}
            readOnly={true}
          />
        </div>

        <Button
          name={'Save-Call'}
          enable={true}
          icon={'save'}
          primary={true}
          extraClassName={'form-button view_commentary_logs_btn pulse'}
          onClick={() => this.openMessages()}
        >
          <FontAwesomeIcon icon="comment-dots" />
          <span className="badge">{0}</span>
        </Button>

        <Modal
          visible={showMessages}
          onClose={this.closeMessages}
          title={
            intl.formatMessage({
              id: 'messages'
            })
          }
        >
          <Messages />
        </Modal>

        <Loader show={false} />
      </div>
    )
  }

  openMessages() {
    this.setState({showMessages: true})
  }
  closeMessages() {
    this.setState({showMessages: false})
  }
}

export default injectIntl(ViewMission);
