import React, {Component} from 'react'
import { FormattedMessage, connect } from 'lib'
import moment from 'moment'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import DropdownList from 'components/DropdownList'
import Textbox from 'components/Textbox'
import DatePicker from 'components/DatePicker'
import TimePicker from 'components/TimePicker'
import Button from 'components/Button'

import styles from './index.scss'

const mapStateToProps = (state) => ({
  // language: lang()
})

class CallRegistration extends Component {

  constructor(props) {
    super(props)

    this.state = {
      extId: '',
      callDate: moment().format('L'),
      callTime: moment().format('LT'),
      caller: '',
      eventAddress: '',
      eventAddressLat: '',
      eventAddressLong: '',
      callType: '',
      queue: '',
      callerPhonoNo: '',
      contactPerson: '',
      contactPhoneNo: '',
      contactAddress: '',
      contactAddressLat: '',
      contactAddressLong: '',
      promiseDate: new Date(),
      promiseTime: null,
      responsible: '1'
    }

    this.createCall = this.createCall.bind(this)
  }

  render() {

    const {
      extId = '',
      callDate = moment().format('L'),
      callTime = moment().format('LT'),
      caller = '',
      eventAddress = '',
      eventAddressLat = '',
      eventAddressLong = '',
      callType = '',
      queue = '',
      callerPhonoNo = '',
      contactPerson = '',
      contactPhoneNo = '',
      contactAddress = '',
      contactAddressLat = '',
      contactAddressLong = '',
      promiseDate = new Date(),
      promiseTime = null,
      responsible = '1'
    } = this.state

    return (
      <div className='callRegistration'>
        <div className='form-field'>
          <FormattedMessage id='externalId' />
          <Textbox
            name={'externalId'}
            value={extId}
            extraClassName='textField'
            placeholder={'Type to add external id'}
            onChange={(value, name) => this.setState({extId: value})}
          />
        </div>

        <div className='callRegistrationRow'>
          <div className='form-field dateAndTime col-12 col-sm-6 col-md-4 col-lg-3'>
            <div className='labelContainer'>
              <FormattedMessage id='date' />
              <FontAwesomeIcon className='callRegistrationIcon' icon="calendar-check" />
            </div>
            <Textbox
              name={'call-date'}
              value={callDate}
              extraClassName='textField readonlyField'
              readOnly={true}
              onChange={(value, name) => this.setState({callDate: value})}
            />
          </div>
          <div className='form-field dateAndTime col-12 col-sm-6 col-md-4 col-lg-3'>
            <div className='labelContainer'>
              <FormattedMessage id='time' />
              <FontAwesomeIcon className='callRegistrationIcon' icon="clock" />
            </div>
            <Textbox
              name={'call-time'}
              value={callTime}
              extraClassName='textField readonlyField'
              onChange={(value, name) => this.setState({callTime: value})}
              readOnly={true}
            />
          </div>
        </div>

          <div className='form-field'>
            <div className='labelContainer'>
              <FormattedMessage id='caller' />
              <FontAwesomeIcon className='callRegistrationIcon' icon="user-check" />
            </div>
            <DropdownList
              name={'call-caller'}
              dataSource={
                [
                 { id: '1', name: 'Razvan I' },
                 { id: '2', name: 'Baciu Sebastian' }
               ]
              }
              value={caller}
              dataTextField={'name'}
              dataValueField={'id'}
              onChange={(val, name) => this.setState({caller: val})}
              extraClassName='form-dropdown'
            />
          </div>

          <div className='callRegistrationRow'>
            <div className='form-field address col-md-7'>
              <div className='labelContainer'>
                <FormattedMessage id='eventAddress' />
                <FontAwesomeIcon className='callRegistrationIcon' icon="map-marked-alt" />
              </div>
              <Textbox
                name={'eventAddress'}
                value={eventAddress}
                extraClassName='textField'
                onChange={(value, name) => this.setState({eventAddress: value})}
              />
            </div>
            <div className='containerLatAndLong col-md-5'>
              <div className='form-field latAndLong'>
                <div className='labelContainer'>
                  <FormattedMessage id='latitude' />
                  <FontAwesomeIcon className='callRegistrationIcon' icon="location-arrow" />
                </div>
                <Textbox
                  name={'latitude'}
                  value={eventAddressLat}
                  extraClassName='textField readonlyField'
                  readOnly={true}
                  onChange={(value, name) => this.setState({eventAddressLat: value})}
                />
              </div>
              <div className='form-field latAndLong'>
                <div className='labelContainer'>
                  <FormattedMessage id='longitude' />
                  <FontAwesomeIcon className='callRegistrationIcon' icon="location-arrow" />
                </div>
                <Textbox
                  name={'longitude'}
                  value={eventAddressLong}
                  extraClassName='textField readonlyField'
                  readOnly={true}
                  onChange={(value, name) => this.setState({eventAddressLong: value})}
                />
              </div>
            </div>
          </div>

          <div className='form-field'>
            <div className='labelContainer'>
              <FormattedMessage id='callSumary' />
              <FontAwesomeIcon className='callRegistrationIcon' icon="comment-alt" />
            </div>
            <textarea type="text" ref="description" placeholder="Type to add call summary"></textarea>
          </div>


          <div className='form-field'>
            <FormattedMessage id='type' />
            <DropdownList
              name={'callType'}
              dataSource={
                [
                 { id: 'emergency', name: 'Emergency Call' },
                 { id: 'informal', name: 'Informal Call' }
               ]
              }
              value={callType}
              dataTextField={'name'}
              dataValueField={'id'}
              onChange={(val, name) => this.setState({callType: val})}
              extraClassName='form-dropdown'
            />
          </div>

          <div className='form-field'>
            <FormattedMessage id='queue' />
            <Textbox
              name={'queue'}
              value={queue}
              extraClassName='textField'
              placeholder={'Type to add the call to a queue'}
              onChange={(value, name) => this.setState({queue: value})}
            />
          </div>

          <div className='form-field'>
            <div className='labelContainer'>
              <FormattedMessage id='phoneNo' />
              <FontAwesomeIcon className='callRegistrationIcon' icon="phone" />
            </div>
            <Textbox
              name={'callerPhonoNo'}
              value={callerPhonoNo}
              extraClassName='textField'
              placeholder={'Type to add phone number'}
              onChange={(value, name) => this.setState({callerPhonoNo: value})}
            />
          </div>

          <div className='form-field'>
            <div className='labelContainer'>
              <FormattedMessage id='contactPerson' />
              <FontAwesomeIcon className='callRegistrationIcon' icon="users" />
            </div>
            <Textbox
              name={'contactPerson'}
              value={contactPerson}
              extraClassName='textField'
              placeholder={'Type to add contact person'}
              onChange={(value, name) => this.setState({contactPerson: value})}
            />
          </div>

          <div className='form-field'>
            <div className='labelContainer'>
              <FormattedMessage id='contactPhone' />
              <FontAwesomeIcon className='callRegistrationIcon' icon="phone" />
            </div>
            <Textbox
              name={'contactPhoneNo'}
              value={contactPhoneNo}
              extraClassName='textField'
              placeholder={'Type to add contact phone'}
              onChange={(value, name) => this.setState({contactPhoneNo: value})}
            />
          </div>

          <div className='callRegistrationRow'>
            <div className='form-field address col-md-7'>
              <div className='labelContainer'>
                <FormattedMessage id='contactAddress' />
                <FontAwesomeIcon className='callRegistrationIcon' icon="map-marked-alt" />
              </div>
              <Textbox
                name={'contactAddress'}
                value={contactAddress}
                extraClassName='textField'
                onChange={(value, name) => this.setState({contactAddress: value})}
              />
            </div>
            <div className='containerLatAndLong col-md-5'>
              <div className='form-field latAndLong'>
                <div className='labelContainer'>
                  <FormattedMessage id='latitude' />
                  <FontAwesomeIcon className='callRegistrationIcon' icon="location-arrow" />
                </div>
                <Textbox
                  name={'contactAddressLat'}
                  value={contactAddressLat}
                  extraClassName='textField readonlyField'
                  readOnly={true}
                  onChange={(value, name) => this.setState({contactAddressLat: value})}
                />
              </div>
              <div className='form-field latAndLong'>
                <div className='labelContainer'>
                  <FormattedMessage id='longitude' />
                  <FontAwesomeIcon className='callRegistrationIcon' icon="location-arrow" />
                </div>
                <Textbox
                  name={'contactAddressLong'}
                  value={contactAddressLong}
                  extraClassName='textField readonlyField'
                  readOnly={true}
                  onChange={(value, name) => this.setState({contactAddressLong: value})}
                />
              </div>
            </div>
          </div>

          <div className='callRegistrationRow'>
            <div className='form-field dateAndTime col-12 col-sm-6 col-md-5 col-lg-4 col-xl-3'>
              <div className='labelContainer'>
                <FormattedMessage id='promiseDate' />
                <FontAwesomeIcon className='callRegistrationIcon' icon="calendar-check" />
              </div>
              <DatePicker
                name={'promiseDate'}
                value={promiseDate}
                format={'MM/dd/yyyy'}
                min={new Date()}
                weekNumber={true}
                start={'month'}
                classDatePicker={'callPromiseDatePicker'}
                onChange={(val, name) => this.setState({promiseDate: val})}
              />

            </div>

            <div className='form-field dateAndTime col-12 col-sm-6 col-md-5 col-lg-4 col-xl-3'>
              <div className='labelContainer'>
                <FormattedMessage id='promiseTime' />
                <FontAwesomeIcon className='callRegistrationIcon' icon="clock" />
              </div>
              <TimePicker
                name='my-timepicker'
                value={promiseTime}
                classTimePicker={'callPromiseTimePicker'}
                onChange={(val, name) => this.setState({promiseTime: val})}
              />
            </div>
          </div>


          <div className='form-field'>
            <div className='labelContainer'>
              <FormattedMessage id='responsible' />
              <FontAwesomeIcon className='callRegistrationIcon' icon="users" />
            </div>
            <DropdownList
              name={'responsiblesDropdownList'}
              dataSource={
                [
                 { id: '1', name: 'Bogdan' },
                 { id: '2', name: 'Elvis' }
               ]
              }
              value={responsible}
              dataTextField={'name'}
              dataValueField={'id'}
              onChange={(val, name) => this.setState({responsible: val})}
              extraClassName='form-dropdown'
            />
          </div>

          <Button
            name={'Save-Call'}
            enable={true}
            icon={'save'}
            primary={true}
            extraClassName={'form-button'}
            onClick={(name) => this.createCall()}
          >
            <FormattedMessage id='save' />
          </Button>
      </div>
    )
  }

  createCall() {
    console.log(this.state);
  }
}

export default connect(mapStateToProps)(CallRegistration);
