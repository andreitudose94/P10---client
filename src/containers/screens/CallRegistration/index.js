import React, {Component} from 'react'
import { FormattedMessage, connect } from 'lib'
import moment from 'moment'
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
import Loader from 'components/Loader'
import MultiSelect from 'components/MultiSelect'

import { getActiveResponsibles, reserveResponsible, releaseResponsibles } from 'actions/responsibles'
import { getDistances } from 'actions/googleAPIs'
import { createCall } from 'actions/calls'

import styles from './index.scss'
import {
  caller_dd_template,
  caller_dd_headerTemplate,
  responsible_dd_template,
  responsible_dd_headerTemplate,
} from './kendo-templates'
import CallerRegistration from './CallerRegistration'
import CallerConfirmation from './CallerConfirmation'

import { getCallers } from 'actions/callers'
import { getCompanies } from 'actions/companies'
import { getContracts } from 'actions/contracts'

class CallRegistration extends Component {

  constructor(props) {
    super(props)

    this.state = {
      extId: '',
      callDate: moment().format('L'),
      callTime: moment().format('LT'),
      dsCallers: [{_id: '', name: '| New Caller |'}],
      companies: [],
      contracts: [],
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
      callerCompanyId: null,
      responsibles: [],
      callCreatedSuccessfully: false,
      showLoader: false,
      alertShow: false,
      alertType: '',
      alertTitle: '',
      alertMssg: '',
      existEventAddress: false,
      contract: 0,
      selectedServices: [],
    }

    this.callLocalId = this.generateUniqueId()

    this.handleCloseModal = this.handleCloseModal.bind(this)
    this.getCallersAndPrelucrateThem = this.getCallersAndPrelucrateThem.bind(this)
    this.determineBestResponsible = this.determineBestResponsible.bind(this)
    this.getResponsiblesAndPrelucrateThem = this.getResponsiblesAndPrelucrateThem.bind(this)
    this.reserveResponsible = this.reserveResponsible.bind(this)
    this.createCall = this.createCall.bind(this)
    this.onCallRegistrationCompleted = this.onCallRegistrationCompleted.bind(this)
    this.onCallerConfirm = this.onCallerConfirm.bind(this)
    this.onHandleChangeAddress = this.onHandleChangeAddress.bind(this)
    this.onHandleSelectAddress = this.onHandleSelectAddress.bind(this)
    this.onHandleChangeContactAddress = this.onHandleChangeContactAddress.bind(this)
    this.onHandleSelectContactAddress = this.onHandleSelectContactAddress.bind(this)
    this.onHandleSelectResponsible = this.onHandleSelectResponsible.bind(this)
    this.createCall = this.createCall.bind(this)
  }

  componentDidMount() {
    window.onbeforeunload = (e) => {
      // I'm about to refresh! do something...
      releaseResponsibles(this.callLocalId)
    };

    this.getCallersAndPrelucrateThem()
      .then(() => this.getResponsiblesAndPrelucrateThem())
    getCompanies()
      .then((companies) => this.setState({ companies }))
  }

  componentWillUnmount() {
    // release all reserved responsibles for this call
    releaseResponsibles(this.callLocalId)
  }

  getCallersAndPrelucrateThem() {
    const { intl = {} } = this.props
    return getCallers()
      .then((callers) => {
        if (callers.error) {
          return this.setState({
            alertShow: true,
            alertType: 'warning',
            alertTitle: intl.formatMessage({id: 'empty'}),
            alertMssg: callers.error,
            dsCallers: dsCallersAux,
          })
        }

        let dsCallersAux = [{_id: '', name: '| New Caller |'}]
        callers.forEach((c) => dsCallersAux.push({ _id: c.companyId + ' | ' + c._id, name: c.company + ' | ' + c.name + ' | ' + c.ssn }))
        return this.setState({ dsCallers: dsCallersAux })
      })
  }

  getResponsiblesAndPrelucrateThem() {
    const { intl = {} } = this.props
    return getActiveResponsibles()
      .then((responsibles) => {
        if (responsibles.error) {
          return this.setState ({
            alertShow: true,
            alertType: 'error',
            alertTitle: intl.formatMessage({id: 'error'}),
            alertMssg: responsibles.error,
            dsResponsibles: dsResponsiblesAux,
            responsibles
          })
        }

        let dsResponsiblesAux = []
        responsibles.forEach((rs) => dsResponsiblesAux.push({ id: rs._id, name: rs.name + ' | ' + rs.responsibleId }))
        return this.setState({ dsResponsibles: dsResponsiblesAux, responsibles })
      })
  }

  generateUniqueId() {
    return Math.floor(Math.random() * 5) + '' + new Date().getTime()
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
      callerCompanyId = null,
      dsResponsibles = [],
      callCreatedSuccessfully = false,
      showLoader = false,
      alertShow = false,
      alertType = 'info',
      alertTitle = 'Title',
      alertMssg = 'No message',
      existEventAddress = false,
      contract = 0,
      selectedServices = [],
      confirmedCaller = false,
      contracts = [],
    } = this.state

    return (
      <div className='callRegistration'>

        <Simplert
          showSimplert={alertShow}
          type={alertType}
          title={alertTitle}
          message={alertMssg}
          onClose={() => this.setState({alertShow: false})}
        />

        { callCreatedSuccessfully && <Redirect to='/history_calls' /> }
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
                    caller: val
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
            <div className='form-field contractRegistration col-md-4'>
              <div className='labelContainer'>
                <FormattedMessage id='contract' />
                <FontAwesomeIcon className='callRegistrationIcon' icon="file-contract" />
              </div>
              <DropdownList
                name={'call-contract'}
                dataSource={contracts}
                value={contract}
                enable={confirmedCaller}
                dataTextField={'contractNumber'}
                dataValueField={'_id'}
                useSelect={true}
                onChange={(val, name) => {

                  const contract = contracts.find((contr) => contr._id === val)
                  this.setState({contract})
                }}
                filter={'contains'}
                searchPlaceholder='Contracts'
                extraClassName={'form-dropdown'}
              />
            </div>
            <div className='form-field services col-md-8'>
              <div className='labelContainer'>
                <FormattedMessage id='services' />
                <FontAwesomeIcon className='callRegistrationIcon' icon="toolbox" />
              </div>
              <MultiSelect
                name={'call-services'}
                dataSource={contract.services}
                value={selectedServices}
                dataTextField={'name'}
                dataValueField={'_id'}
                enable={contract}
                onSelect={(e, selected, name) => {
                  if(selected.name === selectedServices) {
                    e.preventDefault()
                  }
                }}
                onDeselect={(e, selected, name) => {
                  if(selected.title === selectedServices) {
                    e.preventDefault()
                  }
                }}
                onChange={(value, name) => this.setState({selectedServices: value})}
                filter={'startsWith'}
                ignoreCase={false}
                clearButton={true}
                autoWidth={true}
              />
            </div>
          </div>











          <div className='callRegistrationRow'>
            <div className='form-field address col-md-7'>
              <div className='labelContainer'>
                <FormattedMessage id='eventAddress' />
                <FontAwesomeIcon className='callRegistrationIcon' icon="map-marked-alt" />
              </div>
              <SearchLocation
                value={eventAddress}
                onChange={this.onHandleChangeAddress}
                onSelect={this.onHandleSelectAddress}
                className={'textField'}
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
                  { id: '', name: ' | Select a type of call | ' },
                  { id: 'emergency', name: 'Emergency Call' },
                  { id: 'informal', name: 'Informal Call' }
               ]
              }
              value={callType}
              dataTextField={'name'}
              dataValueField={'name'}
              onChange={(val, name) => {
                this.setState({callType: val})
              }}
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
              type='tel'
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
              type='tel'
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
              <SearchLocation
                value={contactAddress}
                onChange={this.onHandleChangeContactAddress}
                onSelect={this.onHandleSelectContactAddress}
              />
              {/*<Textbox
                name={'contactAddress'}
                value={contactAddress}
                extraClassName='textField'
                onChange={(value, name) => this.setState({contactAddress: value})}
              />*/}
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

          <div className='callRegistrationRow'>
            <div className='form-field responsiblesDropdownList col-12 col-sm-9 col-md-10 col-lg-10 col-xl-10'>
              <div className='labelContainer'>
                <FormattedMessage id='responsible' />
                <FontAwesomeIcon className='callRegistrationIcon' icon="suitcase" />
              </div>
              <DropdownList
                name={'responsiblesDropdownList'}
                dataSource={dsResponsibles}
                value={responsible}
                dataTextField={'name'}
                dataValueField={'id'}
                onChange={(val, name) => this.onHandleSelectResponsible(val)}
                template={responsible_dd_template}
                headerTemplate={responsible_dd_headerTemplate}
                searchPlaceholder='Responsible | ID'
                filter={'contains'}
                useSelect={true}
                extraClassName='form-dropdown'
              />
            </div>
            <div className='form-field calcDistContainer col-12 col-sm-3 col-md-2 col-lg-2 col-xl-2'>
              <Button
                name={'Calc-Distance'}
                enable={true}
                icon={'reload'}
                primary={true}
                extraClassName={'form-button btnCalcDist'}
                onClick={(name) => this.determineBestResponsible()}
              >
              </Button>
            </div>
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
          <Loader show={showLoader} />
      </div>
    )
  }

  createCall() {
    const {
      extId = '',
      callDate = '',
      callTime = '',
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
      promiseDate = '',
      promiseTime = '',
      responsible = '',
      responsibles = [],
      dsCallers = [],
      dsResponsibles = [],
      confirmedCaller = false,
      contract = [],
      selectedServices = [],
    } = this.state

    const { intl } = this.props
    const datetime = moment(new Date(callDate + " " + callTime)).format('LLL')
    const eventAddressGeolocation = {
      lat: eventAddressLat,
      lng: eventAddressLong
    }
    const summary = this.refs.description.value
    const contactAddressGeolocation = {
      lat: contactAddressLat,
      lng: contactAddressLong

    }
    const dateP = moment(new Date(promiseDate)).format('L')
    const timeP = moment(new Date(promiseTime)).format('LT')
    let promisedDateTime = ''
    if (moment(new Date(dateP + " " + timeP)).format('LLL') !== 'Invalid date') {
      promisedDateTime = moment(new Date(dateP + " " + timeP)).format('LLL')
    }

    if (dsCallers.find((dsCaller) => dsCaller._id === caller)._id === '') {
      return this.setState({
        alertShow: true,
        alertType: 'warning',
        alertTitle: intl.formatMessage({ id: 'empty' }),
        alertMssg: intl.formatMessage({ id: 'newCall.emptyCaller' })
      })
    }
    console.log(selectedServices);
    console.log('contract', contract);
    if(!selectedServices.length || contract === '')
      return this.setState({
        alertShow: true,
        alertType: 'warning',
        alertTitle: intl.formatMessage({ id: 'empty' }),
        alertMssg: intl.formatMessage({ id: 'newCall.emptyContractAndServices' })
      })
    if(!eventAddress) return this.setState({
      alertShow: true,
      alertType: 'warning',
      alertTitle: intl.formatMessage({ id: 'empty' }),
      alertMssg: intl.formatMessage({ id: 'newCall.emptyEventAddress' })
    })
    if(!eventAddressGeolocation.lat) return this.setState({
      alertShow: true,
      alertType: 'warning',
      alertTitle: intl.formatMessage({ id: 'empty' }),
      alertMssg: intl.formatMessage({ id: 'newCall.emptyLatLng' })
    })
    if(!summary) return this.setState({
      alertShow: true,
      alertType: 'warning',
      alertTitle: intl.formatMessage({ id: 'empty' }),
      alertMssg: intl.formatMessage({ id: 'newCall.emptySummary' })
    })
    if(callType === '' || callType === ' | Select a type of call | ') return this.setState({
      alertShow: true,
      alertType: 'warning',
      alertTitle: intl.formatMessage({ id: 'empty' }),
      alertMssg: intl.formatMessage({ id: 'newCall.emptyCallType' })
    })
    if(callerPhonoNo.length < 10)
      return this.setState({
        alertShow: true,
        alertType: 'error',
        alertTitle: intl.formatMessage({ id: 'error' }),
        alertMssg: intl.formatMessage({ id: 'newCall.wrongNumber' })
      })
    if(!dsResponsibles.find((res) => res.id === responsible))
      return this.setState({
        alertShow: true,
        alertType: 'warning',
        alertTitle: intl.formatMessage({ id: 'empty' }),
        alertMssg: intl.formatMessage({ id: 'newCall.emptyResponsible' })
      })


    if (confirmedCaller) {
      let  servicesMustSave = []
       selectedServices.forEach((sv_id) => {
         servicesMustSave.push(contract.services.find((sv) => sv_id === sv._id))
       })
      createCall({
        extId,
        datetime,
        caller: dsCallers.find((dsCaller) => dsCaller._id === caller).name,
        summary,
        eventAddress,
        eventAddressGeolocation,
        type: callType,
        queue,
        phoneNo: callerPhonoNo,
        contact: contactPerson,
        contactPhoneNo,
        contactAddress,
        contactAddressGeolocation,
        promisedDateTime,
        responsible: dsResponsibles.find((res) => res.id === responsible).name,
        contractNumber: contract.contractNumber,
        services: servicesMustSave,
      })
        .then((res) => {
          if (res.error) {
            return this.setState({
              alertShow: true,
              alertType: 'error',
              alertTitle: intl.formatMessage({ id: 'error' }),
              alertMssg: res.error,
              callCreatedSuccessfully: true
            })
          } else if(res.body && res.body.ok) { // if all worked well
            this.setState({ callCreatedSuccessfully: true })
          }
        })
    } else {
      return this.setState({
        alertShow: true,
        alertType: 'error',
        alertTitle: intl.formatMessage({ id: 'wrongPass' }),
        alertMssg: intl.formatMessage({ id: 'newCall.wrongCompanyPassword' })
      })
    }
  }

  determineBestResponsible() {
    const { intl } = this.props
    const { responsibles = [], eventAddressLat = '', eventAddressLong = '', existEventAddress } = this.state

    if (existEventAddress) {
      this.setState({showLoader: true})
    } else {
      this.setState({
        showLoader: false,
        alertShow: true,
        alertType: 'error',
        alertTitle: intl.formatMessage({ id: 'empty' }),
        alertMssg: intl.formatMessage({ id: 'emptyevAddress' })
      })
    }

    if (eventAddressLat === '') {
      return
        this.setState({
          showLoader: false,
          alertShow: true,
          alertType: 'error',
          alertTitle: intl.formatMessage({ id: 'empty' }),
          alertMssg: intl.formatMessage({ id: 'emptyevAddress' })
        })
    }
    // if there is no responsible then we can't calculate the distances
    if(responsibles.length === 0) {
      return
        this.setState({
          showLoader: false,
          alertShow: true,
          alertType: 'warning',
          alertTitle: intl.formatMessage({ id: 'noAvailable' }),
          alertMssg: intl.formatMessage({ id: 'noAvaibleRes' })
        })
    }
    // let's construct the origins parameter for the Google API
    // which will contain the coordinates of the responsibles
    let origins = '';
    responsibles.forEach((resp) => {
      origins += resp.geolocation.lat + ', ' + resp.geolocation.lng + '%7C'
    })

    // the destination will be the location of the event
    const destinations = eventAddressLat + ', ' + eventAddressLong

    // call the Google API
    return getDistances(origins, destinations)
      .then((res) => {
        // get the data received from Google API and determine the minimum duration
        // and also the best responsible according to that duration
        if (res.error) {
          return this.setState({
            alertShow: true,
            alertType: 'error',
            alertTitle: intl.formatMessage({ id: 'error' }),
            alertMssg: res.error
          })
        }
        const { rows = [] } = res
        const MAX_DURATION_POSSIBLE = 60 * 24 * 4 // 4 days
        let minDuration = MAX_DURATION_POSSIBLE
        let bestResponsible = -1

        rows.forEach((r, index) => {
          const { elements } = r
          const { status } = elements[0]
          // we will consider only the right values returned from the server
          if(status === 'OK') {
            // the value is specified in number of minutes
            const { duration: { value } } = elements[0]
            if(value < minDuration) {
              minDuration = value
              bestResponsible = responsibles[index]
            }
          }
        })

        // if at least a responsible corresponded
        if(minDuration !== MAX_DURATION_POSSIBLE) {
          this.setState({
            alertShow: true,
            alertType: 'info',
            alertTitle: 'Info',
            alertMssg: intl.formatMessage(
              {id: 'avaibleResonsabile'},
              {name: bestResponsible.name, minutes: Math.ceil(minDuration / 60)}
            ),
          })
          // then we will try to reserve it from server
          return this.reserveResponsible(bestResponsible._id)
        } else {
          // if there is no 'best responsible'
          this.setState({
            alertShow: true,
            alertType: 'warning',
            alertTitle: intl.formatMessage({ id: 'noAvailable' }),
            alertMssg: intl.formatMessage({id: 'noAvaibleRes'}),
          })
        }
      })
      .then(() => this.setState({showLoader: false}))
  }

  reserveResponsible(id) {
    // call API server to reserve the best responsible
    // using the call local unique id => the status will become 'Reserved-uniqueId'
    return reserveResponsible(id, this.callLocalId)
      .then((res) => {
        // if the responsible couldn't be reserved because it was already reserved
        // then we should get the responsibles again from the server
        // because they were modified
        if(res === 'Responsible already reserved') {
          this.setState({
            alertShow: true,
            alertType: 'warning',
            alertTitle: intl.formatMessage({ id: 'anotherResponsible' }),
            alertMssg: intl.formatMessage({id: 'anotherResponsibleSelect'}),
          })
          return this.getResponsiblesAndPrelucrateThem()
        }

        this.setState({ responsible: res.body.id })

        // but if the responsible was reserved successfully then we may stop
        return 'stop'
      })
      .then((res) => {
        // if the previous '.then()' decided not to stop
        // then it means that in the res we have the new set of responsibles who came from server
        // and we will again try to determine which one is the best
        if(res !== 'stop') {
          // we try to determine the best responsible again
          return this.determineBestResponsible()
        }
      })
  }

  handleCloseModal() {
    this.setState({ showModal: false })
  }

  onCallerConfirm() {
    const { caller, companies } = this.state

    const company = companies.find((company) => company._id === this.state.caller.split(' ')[0]).name

    getContracts()
    .then((contracts) =>  contracts.filter((contr) => contr.company === company))
    .then((contracts) => this.setState({ showModal: false, confirmedCaller: true, contracts }))


  }

  onCallRegistrationCompleted(caller) {

    this.setState({ showModal: false, confirmedCaller: true })

    this.getCallersAndPrelucrateThem()
      .then(() => this.setState({ caller: caller.companyId + ' | ' + caller._id }))
  }

  onHandleChangeAddress(address) {
    this.setState({
      eventAddress: address
    })
  }

  onHandleSelectAddress(address) {
    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(({lat, lng}) =>
        this.setState({
          eventAddress: address,
          eventAddressLat: lat,
          eventAddressLong: lng,
          existEventAddress: true,
        })
      )
      // .then(() => this.determineBestResponsible())
  }

  onHandleChangeContactAddress(address) {
    this.setState({
      contactAddress: address,
    })
  }

  onHandleSelectContactAddress(address) {
    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(({lat, lng}) =>
        this.setState({
          contactAddress: address,
          contactAddressLat: lat,
          contactAddressLong: lng,
        })
      )
  }

  onHandleSelectResponsible(responsible) {
    if (responsible) {
      this.reserveResponsible(responsible)
    }
    this.setState({responsible: responsible})
  }
}

export default injectIntl(CallRegistration);
