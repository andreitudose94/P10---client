import React, {Component} from 'react'
import { FormattedMessage, connect } from 'lib'
import moment from 'moment'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { injectIntl } from 'react-intl'

import DropdownList from 'components/DropdownList'
import Textbox from 'components/Textbox'
import DatePicker from 'components/DatePicker'
import TimePicker from 'components/TimePicker'
import Button from 'components/Button'
import Modal from 'components/Modal'

import styles from './index.scss'
import {
  caller_dd_template,
  caller_dd_headerTemplate,
  responsible_dd_template,
  responsible_dd_headerTemplate,
} from './kendo-templates'
import CallerRegistration from './CallerRegistration'
import CallerConfirmation from './CallerConfirmation'

import {
  getCallers
} from 'actions/callers'

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
      dsCallers: [{_id: '', name: '| New Caller |'}],
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
      responsible: '',
      showModal: false,
      createCaller: false,
      confirmedCaller: false,
      callerCompanyId: null
    }

    this.handleCloseModal = this.handleCloseModal.bind(this)
    this.getCallersAndPrelucrateThem = this.getCallersAndPrelucrateThem.bind(this)
    this.createCall = this.createCall.bind(this)
    this.onCallRegistrationCompleted = this.onCallRegistrationCompleted.bind(this)
    this.onCallerConfirm = this.onCallerConfirm.bind(this)
  }

  componentDidMount() {
    this.getCallersAndPrelucrateThem()
  }

  getCallersAndPrelucrateThem() {
    return getCallers()
      .then((callers) => {
        let dsCallersAux = [{_id: '', name: '| New Caller |'}]
        callers.forEach((c) => dsCallersAux.push({ _id: c.companyId + ' | ' + c._id, name: c.company + ' | ' + c.name + ' | ' + c.ssn }))
        return this.setState({ dsCallers: dsCallersAux })
      })
  }

  render() {

    const { intl = {} } = this.props

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
      responsible = '',
      showModal = false,
      createCaller = false,
      dsCallers = [{_id: '', name: '| New Caller |'}],
      callerCompanyId = null
    } = this.state

    return (
      <div className='callRegistration'>
        <div className='form-field'>
          <div className='labelContainer'>
            <FormattedMessage id='externalId' />
            <FontAwesomeIcon className='callRegistrationIcon' icon="key" />
          </div>
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
              dataSource={dsCallers}
              value={caller}
              dataTextField={'name'}
              dataValueField={'_id'}
              useSelect={true}
              onChange={(val, name) => {
                if(val === '') {
                  this.setState({
                    createCaller: true,
                    caller: val
                  })
                } else {
                  // if val !== '' then the val is like this COMPANY_ID | CALLER_ID
                  this.setState({
                    createCaller: false,
                    callerCompanyId: val.split('|')[0].trim(),
                    caller: val.split('|')[1].trim()
                  })
                }
                this.setState({ showModal: true })
              }}
              filter={'contains'}
              searchPlaceholder='Company | Caller Name | Caller SSN'
              extraClassName='form-dropdown'
              template={caller_dd_template}
              headerTemplate={caller_dd_headerTemplate}
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
            <div className='labelContainer'>
              <FormattedMessage id='type' />
              <FontAwesomeIcon className='callRegistrationIcon' icon="exclamation-triangle" />
            </div>
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
            <div className='labelContainer'>
              <FormattedMessage id='queue' />
              <FontAwesomeIcon className='callRegistrationIcon' icon="list-ol" />
            </div>
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
              <FontAwesomeIcon className='callRegistrationIcon' icon="user" />
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
                <FontAwesomeIcon className='callRegistrationIcon' icon="building" />
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
              <FontAwesomeIcon className='callRegistrationIcon' icon="suitcase" />
            </div>
            <DropdownList
              name={'responsiblesDropdownList'}
              dataSource={
                [
                 { id: '', name: 'Responsible' },
                 { id: '1', name: 'Bogdan | 111111' },
                 { id: '2', name: 'Elvis | 22223' }
               ]
              }
              value={responsible}
              dataTextField={'name'}
              dataValueField={'id'}
              onChange={(val, name) => this.setState({responsible: val})}
              template={responsible_dd_template}
              headerTemplate={responsible_dd_headerTemplate}
              searchPlaceholder='Responsible | ID'
              filter={'contains'}
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

          <Modal
            visible={showModal}
            onClose={this.handleCloseModal}
            title={
              intl.formatMessage({
                id: createCaller ? 'createCaller' : 'callerConfirmation'
              })
            }
          >
            {
              showModal && createCaller &&
                <CallerRegistration
                  onSuccess={this.onCallRegistrationCompleted}
                />
            }
            {
              showModal && !createCaller &&
                <CallerConfirmation
                  companyId={callerCompanyId}
                  onSuccess={this.onCallerConfirm}
                />
            }
          </Modal>
      </div>
    )
  }

  createCall() {
    console.log(this.state);
  }

  handleCloseModal() {
    this.setState({ showModal: false })
  }

  onCallerConfirm() {
    this.setState({ showModal: false, confirmedCaller: true })
  }

  onCallRegistrationCompleted(caller) {

    this.setState({ showModal: false, confirmedCaller: true })

    this.getCallersAndPrelucrateThem()
      .then(() => this.setState({ caller: caller.companyId + ' | ' + caller._id }))
  }
}

export default injectIntl(connect(mapStateToProps)(CallRegistration));
