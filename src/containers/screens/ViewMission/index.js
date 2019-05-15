import React, {Component} from 'react'
import { FormattedMessage, connect } from 'lib'
import moment from 'moment'
import socketIOClient from "socket.io-client";
import { Redirect } from 'react-router-dom';
import Simplert from 'react-simplert'

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
import Chat from 'components/Chat'

import { getActiveResponsibles, reserveResponsible, releaseResponsibles } from 'actions/responsibles'
import { getDistances } from 'actions/googleAPIs'
import { createCall } from 'actions/calls'
import { getMissionsForSpecifiedCall } from 'actions/missions'
import { getMessages, createMessage, updateMessages } from 'actions/messages'
import {
  getCallers
} from 'actions/callers'

import { getUser } from 'selectors/user'

import styles from './index.scss'

const mapStateToProps = (state) => ({
  user: getUser()
})

let socket;

class ViewMission extends Component {

  constructor(props) {
    super(props)

    this.state = {
      showMessages: false,
      nrMsgUnread: 0,
      mission: {},
      messages:[],
      showLoader: false,
      alertShow: false,
      alertType: '',
      alertTitle: '',
      alertMssg: '',
    }

    this.openMessages = this.openMessages.bind(this)
    this.closeMessages = this.closeMessages.bind(this)
  }

  componentDidMount() {
    const { match, intl = {}, user } = this.props

    this.setState({showLoader: true})
    const missionId = match.params.mission_id
    getMissionsForSpecifiedCall(missionId)
      // .tap((res) => res.error &&
      //   this.setState({
      //     alertShow: true,
      //     alertType: 'error',
      //     alertTitle: 'Error',
      //     alertMssg: res.error,
      //   })
      // )
      .then((missions) => {
        if (missions.error) {
          return this.setState({
            alertShow: true,
            alertType: 'error',
            alertTitle: intl.formatMessage({id: 'error'}),
            alertMssg: missions.error,
          })
        } else {
            //**********
          socket = socketIOClient('http://localhost:8000/');

          const data = {
            callIndex: missions[0].call_index,
            primaryTenant: missions[0].primaryTenant,
            activeTenant: missions[0].activeTenant
          }

          socket.emit('messages_data', data)
          socket.on("get_messages", (messages) => {
            if(messages.length !== this.state.messages.length) {
              const nrMsgUnread = (messages.filter((msg) =>
                (msg.sentBy !== user.name) && !msg.read
              )).length;

              return this.setState({ messages, nrMsgUnread })
            }
          });
          return missions[0]
        }
      })
      .then((mission) => {
        return getMessages(missionId)
          .then((messages) => {
            const nrMsgUnread = (messages.filter((msg) =>
              (msg.sentBy !== user.name) && !msg.read
            )).length;
            return this.setState({messages, mission, nrMsgUnread})
          })
      })
      .then(() => this.setState({showLoader: false}))
  }

  componentWillUnmount() {
    socket.disconnect();
  }

  writeMessage(message) {
    const { mission = {} } = this.state

    const newMessage = {
      text: message,
      callIndex: mission.call_index,
      datetimeSent: new Date(),
      sentBy: this.props.user.name,
      read: false,
      primaryTenant: this.props.user.primaryTenant,
      activeTenant: this.props.user.activeTenant,
    }

    createMessage(newMessage)
  }

  render() {

    const { intl = {}, user } = this.props
    const {
      showMessages = false,
      nrMsgUnread = 0,
      mission = {},
      messages = [],
      showLoader = false,
      alertShow = false,
      alertType = 'info',
      alertTitle = 'Title',
      alertMssg = 'No message'
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
      file = {},
    } = mission

    return (
      <div className='viewMission'>

        <Simplert
          showSimplert={alertShow}
          type={alertType}
          title={alertTitle}
          message={alertMssg}
          onClose={() => this.setState({alertShow: false})}
        />

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

        {
          file.fileName ?
          (
            <div className='form-field'>
              <div className='labelContainer'>
                <FormattedMessage id='viewMission.file' />
                <FontAwesomeIcon className='callRegistrationIcon' icon='paperclip' />
              </div>
              <a target="_blank" href={file.fileLink}>{file.fileName}</a>
            </div>
          ) : ''

        }

        <div className='form-field'>
          <div className='labelContainer'>
            <FormattedMessage id='viewMission.caseMap' />
          </div>
          <div className='containerMap'>
            <MapContainer
              resp_id={responsible.split('|')[1]|| ''.trim()}
              eventAddressGeolocation={eventAddressGeolocation}

            />
          </div>
        </div>

        {
          takenImages.length ?
          (
            <div className='form-field'>
              <div className='labelContainer'>
                <FormattedMessage id='viewMission.photos' />
                <FontAwesomeIcon className='callRegistrationIcon' icon='images' />
              </div>
              {
                takenImages.map((image, index) =>
                  <img key={index} className='photo_take' src={image} />
                )
              }
              </div>
          ) : ''

        }

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
          {
            nrMsgUnread ? <span className='badge'>{nrMsgUnread}</span> : ''
          }
        </button>
        <Modal
          visible={showMessages}
          onClose={this.closeMessages}
          title={
            intl.formatMessage({
              id: 'viewMission.messages'
            })
          }
          extraClassName='chatModal'
        >
          <Chat
            chatId={'chat'}
            messages={ messages }
            sendMessage={(message) => this.writeMessage(message)}
          />

        </Modal>

        <Loader show={showLoader} />
      </div>
    )
  }

  openMessages() {
    const {
      mission = {},
    } = this.state

    const { user, match } = this.props

    const missionId = match.params.mission_id

    updateMessages({
      callIndex: missionId,
      primaryTenant: mission.primaryTenant,
      activeTenant: mission.activeTenant,
    })
    .then(() => this.setState({ showMessages: true, nrMsgUnread:0 }))
  }

  closeMessages() {
    this.setState({showMessages: false})
  }
}

export default connect(mapStateToProps)(injectIntl(ViewMission));
