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
import MapContainer from './MapContainer'
import Loader from 'components/Loader'

import Messages from './Messages'

import { getActiveResponsibles, reserveResponsible, releaseResponsibles } from 'actions/responsibles'
import { getDistances } from 'actions/googleAPIs'
import { createCall } from 'actions/calls'
import { getMissionsForSpecifiedCall } from 'actions/missions'
import {
  getCallers
} from 'actions/callers'

import styles from './index.scss'


class ViewMission extends Component {

  constructor(props) {
    super(props)

    this.state = {
      showMessages: false,
      nrMessages: 0,
      mission: {},
      showLoader: false,
    }

    this.openMessages = this.openMessages.bind(this)
    this.closeMessages = this.closeMessages.bind(this)
  }

  componentDidMount() {
    const { match } = this.props

    this.setState({showLoader: true})
    const missionId = match.params.mission_id
    getMissionsForSpecifiedCall(missionId)
      .then((missions) => this.setState({mission: {...missions[0]}}))
      .then(() => this.setState({showLoader: false}))
  }

  render() {

    const { intl = {} } = this.props
    const {
      showMessages = false,
      nrMessages = 0,
      mission = {},
      showLoader = false,
    } = this.state

    const {
      call_index = '',
      contact = '',
      contactAddress = '',
      contactPhoneNo = '',
      effectiveEndDateTime = '',
      effectiveStartDateTime = '',
      estimatedEndDateTime = '',
      estimatedStartDateTime = '',
      eventAddress = '',
      eventAddressGeolocation = {},
      modifiedAt = '',
      primaryTenant = '',
      responsible = '',
      signature = '',
      status = '',
      summary = '',
      takenImages = [],
    } = mission

    return (
      <div className='viewMission'>
        <div className='form-field'>
          <div className='labelContainer'>
            <FormattedMessage id='viewMission.callIndex' />
            <FontAwesomeIcon className='callRegistrationIcon' icon="key" />
          </div>
          <Textbox
            name={'externalIndex'}
            value={call_index}
            extraClassName='textField readonlyField'
            readOnly={true}
          />
        </div>

        <div className='callRegistrationRow'>
          <div className='form-field dateAndTime col-12 col-sm-6 col-md-6 col-lg-6'>
            <div className='labelContainer'>
              <FormattedMessage id='viewMission.estimatedStartDate' />
              <FontAwesomeIcon className='callRegistrationIcon' icon="calendar-check" />
            </div>
            <Textbox
              name={'estimatedStartDate'}
              value={moment(estimatedStartDateTime).format('L')}
              extraClassName='textField readonlyField'
              readOnly={true}
            />
          </div>
          <div className='form-field dateAndTime col-12 col-sm-6 col-md-6 col-lg-6'>
            <div className='labelContainer'>
              <FormattedMessage id='viewMission.estimatedStartTime' />
              <FontAwesomeIcon className='callRegistrationIcon' icon="clock" />
            </div>
            <Textbox
              name={'estimatedStartTime'}
              value={moment(estimatedStartDateTime).format('LT')}
              extraClassName='textField readonlyField'
              readOnly={true}
            />
          </div>
        </div>

        <div className='callRegistrationRow'>
          <div className='form-field dateAndTime col-12 col-sm-6 col-md-6 col-lg-6'>
            <div className='labelContainer'>
              <FormattedMessage id='viewMission.effectiveStartDate' />
              <FontAwesomeIcon className='callRegistrationIcon' icon="calendar-check" />
            </div>
            <Textbox
              name={'effectiveStartDate'}
              value={effectiveStartDateTime ? moment(effectiveStartDateTime).format('L') : ''}
              extraClassName='textField readonlyField'
              readOnly={true}
            />
          </div>
          <div className='form-field dateAndTime col-12 col-sm-6 col-md-6 col-lg-6'>
            <div className='labelContainer'>
              <FormattedMessage id='viewMission.effectiveStartTime' />
              <FontAwesomeIcon className='callRegistrationIcon' icon="clock" />
            </div>
            <Textbox
              name={'effectiveStartTime'}
              value={effectiveStartDateTime ? moment(effectiveStartDateTime).format('LT') : ''}
              extraClassName='textField readonlyField'
              readOnly={true}
            />
          </div>
        </div>

        <div className='callRegistrationRow'>
          <div className='form-field dateAndTime col-12 col-sm-6 col-md-6 col-lg-6'>
            <div className='labelContainer'>
              <FormattedMessage id='viewMission.effectiveEndDate' />
              <FontAwesomeIcon className='callRegistrationIcon' icon="calendar-check" />
            </div>
            <Textbox
              name={'effectiveEndDate'}
              value={effectiveEndDateTime ? moment(effectiveEndDateTime).format('L') : ''}
              extraClassName='textField readonlyField'
              readOnly={true}
            />
          </div>
          <div className='form-field dateAndTime col-12 col-sm-6 col-md-6 col-lg-6'>
            <div className='labelContainer'>
              <FormattedMessage id='viewMission.effectiveEndTime' />
              <FontAwesomeIcon className='callRegistrationIcon' icon="clock" />
            </div>
            <Textbox
              name={'effectiveEndTime'}
              value={effectiveEndDateTime ? moment(effectiveEndDateTime).format('LT') : ''}
              extraClassName='textField readonlyField'
              readOnly={true}
            />
          </div>
        </div>

        <div className='callRegistrationRow'>
          <div className='form-field dateAndTime col-12 col-sm-6 col-md-6 col-lg-6'>
            <div className='labelContainer'>
              <FormattedMessage id='viewMission.estimatedEndDate' />
              <FontAwesomeIcon className='callRegistrationIcon' icon="calendar-check" />
            </div>
            <Textbox
              name={'estimatedEndDate'}
              value={estimatedEndDateTime ? moment(estimatedEndDateTime).format('L') : ''}
              extraClassName='textField readonlyField'
              readOnly={true}
            />
          </div>
          <div className='form-field dateAndTime col-12 col-sm-6 col-md-6 col-lg-6'>
            <div className='labelContainer'>
              <FormattedMessage id='viewMission.estimatedEndTime' />
              <FontAwesomeIcon className='callRegistrationIcon' icon="clock" />
            </div>
            <Textbox
              name={'estimatedEndTime'}
              value={estimatedEndDateTime ? moment(estimatedEndDateTime).format('LT') : ''}
              extraClassName='textField readonlyField'
              readOnly={true}
            />
          </div>
        </div>

        <div className='form-field'>
          <div className='labelContainer'>
            <FormattedMessage id='viewMission.assignedResponsible' />
            <FontAwesomeIcon className='callRegistrationIcon' icon="suitcase" />
          </div>
          <Textbox
            name={'estimatedEndTime'}
            value={responsible}
            extraClassName='textField readonlyField'
            readOnly={true}
          />
        </div>



        <div className='form-field'>
          <div className='labelContainer'>
            <FormattedMessage id='viewMission.caseSummary' />
            <FontAwesomeIcon className='callRegistrationIcon' icon="comment-alt" />
          </div>
          <textarea className='readonlyField' type="text" value={summary} readOnly />
        </div>

        <div className='form-field'>
          <div className='labelContainer'>
            <FormattedMessage id='viewMission.contactPerson' />
            <FontAwesomeIcon className='callRegistrationIcon' icon="user" />
          </div>
          <Textbox
            name={'contactPerson'}
            value={contact}
            type='text'
            extraClassName='textField readonlyField'
            readOnly={true}
          />
        </div>

        <div className='form-field'>
          <div className='labelContainer'>
            <FormattedMessage id='viewMission.contactPhone' />
            <FontAwesomeIcon className='callRegistrationIcon' icon="phone" />
          </div>
          <Textbox
            name={'contactPhone'}
            value={contactPhoneNo}
            extraClassName='textField readonlyField'
            readOnly={true}
          />
        </div>

        <div className='form-field'>
          <div className='labelContainer'>
            <FormattedMessage id='viewMission.contactAddress' />
            <FontAwesomeIcon className='callRegistrationIcon' icon="building" />
          </div>
          <textarea className='readonlyField' type="text" value={contactAddress} readOnly />
        </div>

        <div className='form-field'>
          <div className='labelContainer'>
            <FormattedMessage id='viewMission.eventAddress' />
            <FontAwesomeIcon className='callRegistrationIcon' icon="map-marked-alt" />
          </div>
          <textarea className='readonlyField' type="text" value={eventAddress} readOnly />
        </div>

        <div className='form-field'>
          <div className='labelContainer'>
            <FormattedMessage id='viewMission.caseMap' />
          </div>
          <div className='containerMap'>
            <MapContainer
              responsible={responsible}
              name={responsible.split('|')[0] || ''.trim()}
              resp_id={responsible.split('|')[1]|| ''.trim()}
              status={status}
              online={true}
              eventAddressGeolocation={eventAddressGeolocation}

            />
          </div>
        </div>

        <div className='form-field'>
          <div className='labelContainer'>
            <FormattedMessage id='viewMission.status' />
          </div>
          <Textbox
            name={'status'}
            value={status}
            type='tel'
            extraClassName='textField readonlyField'
            readOnly={true}
          />
        </div>

        <button
          className={'form-button view_commentary_logs_btn pulse'}
          onClick={() => this.openMessages()}
        >
        <FontAwesomeIcon icon='comment-dots' />
          <span className='badge'>{nrMessages}</span>
        </button>
        <Modal
          visible={showMessages}
          onClose={this.closeMessages}
          title={
            intl.formatMessage({
              id: 'viewMission.messages'
            })
          }
        >
          <Messages chatId={'chat'} />

        </Modal>

        <Loader show={showLoader} />
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
