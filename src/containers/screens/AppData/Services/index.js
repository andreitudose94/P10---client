import React, {Component} from 'react'
import { FormattedMessage, connect } from 'lib'
import { injectIntl } from 'react-intl'
import Simplert from 'react-simplert'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import Grid from 'components/Grid'
import Modal from 'components/Modal'
import Button from 'components/Button'
import Textbox from 'components/Textbox'
import DropdownList from 'components/DropdownList'
import Loader from 'components/Loader'

import styles from './index.scss'
import {
  template,
  toolbarTemplate
} from './kendo-templates'

import { getServices, createService } from 'actions/services'

class Services extends Component {

  constructor(props) {
    super(props)
    this.state = {
      services: [],
      introducedName: '',
      introducedDescription: '',
      introducedPricePerUnit: '',
      introducedUnit: '',
      selectedCurrency: '',
      name: '',
      showModal: false,
      showLoader: false,
      alertShow: false,
      alertType: '',
      alertTitle: '',
      alertMssg: '',
      dbCurrencys: [
        {id: 'none', 'name': 'Select a currency'},
        {id: 'euro', name: '€'},
        {id: 'dolar', name: '$'},
        {id: 'leu', name: 'LEI'}
      ]
    },
    this.handleCloseModal = this.handleCloseModal.bind(this)
    this.createService = this.createService.bind(this);

  }

  componentDidMount() {
    getServices()
      .then((services) => this.setState({ services }))
  }

  render() {

    const {
      intl = {}
    } = this.props

    const {
      services = [],
      showModal = false,
      showLoader = false,
      name = '',
      introducedName = '',
      introducedDescription = '',
      introducedPricePerUnit = '',
      introducedUnit = '',
      selectedCurrency = '',
      dbCurrencys = [],
      alertShow = false,
      alertType = 'info',
      alertTitle = 'Title',
      alertMssg = 'No message'
    } = this.state

    return (
      <div className='services'>

        <Simplert
          showSimplert={alertShow}
          type={alertType}
          title={alertTitle}
          message={alertMssg}
          onClose={() => this.setState({alertShow: false})}
        />

        <div className='form-field'>
          <span>Services</span>
          <Grid
            gridId={'servicesGrid'}
            columns={
              [{
                field: "name",
                headerAttributes: {
                  "class": "services-grid-thead-cell",
                  style: "text-align: center; font-size: 14px; width: calc(3/12 * 100%)"
                },
                title: 'Name'
              },{
                field: "description",
                headerAttributes: {
                  "class": "services-grid-thead-cell",
                  style: "text-align: center; font-size: 14px; width: calc(3/12 * 100%)"
                },
                title: 'Description'
              }, {
                field: "pricePerUnit",
                headerAttributes: {
                  "class": "services-grid-thead-cell",
                  style: "text-align: center; font-size: 14px; width: calc(2/12 * 100%)"
                },
                title: 'Price Per Unit'
              }, {
                field: "unit",
                headerAttributes: {
                  "class": "services-grid-thead-cell",
                  style: "text-align: center; font-size: 14px; width: calc(2/12 * 100%)"
                },
                title: 'Unit'
              }, {
                field: "currency",
                headerAttributes: {
                  "class": "services-grid-thead-cell",
                  style: "text-align: center; font-size: 14px; width: calc(2/12 * 100%)"
                },
                title: 'Currency'
              }]
            }
            dataSource={services}
            rowTemplate={template}
            visibleHeader={true}
            pageable={{
              pageSize: 10
            }}
            toolbar={
              toolbarTemplate
            }
        	  pdf={{
        	    allPages: true,
        	    avoidLinks: true,
        	    paperSize: "A4",
        	    margin: { top: "1cm", left: "1cm", right: "1cm", bottom: "1cm" },
        	    landscape: true,
        	    repeatHeaders: true,
        	    scale: 0.8
        	  }}
        	  pdfButtonTitle={'PDF'}
        	  excel={{
        	    fileName: "Services.xlsx",
        	    allPages: true
        	  }}
        	  excelButtonTitle={'EXCEL'}
            createButtonTitle={'toolbar-add-btn'}
            onCreate_Custom={() => this.setState({showModal: true})}
          />

        <Modal
            visible={showModal}
            onClose={this.handleCloseModal}
            title={
              intl.formatMessage({
                id: 'createService'
              })
            }
          >

            <div className='form-field'>
              <div className='labelContainer'>
                <FormattedMessage id='name' />
                <FontAwesomeIcon className='callRegistrationIcon' icon="building" />
              </div>
              <Textbox
                name={'new-service-name'}
                value={introducedName}
                extraClassName='textField'
                placeholder={'Type to introduce the service\'s name'}
                onChange={(value, name) => this.setState({introducedName: value})}
              />
            </div>

            <div className='form-field'>
              <div className='labelContainer'>
                <FormattedMessage id='description' />
                <FontAwesomeIcon className='callRegistrationIcon' icon="user" />
              </div>
              <Textbox
                name={'new-caller-description'}
                value={introducedDescription}
                extraClassName='textField'
                placeholder={'Type to introduce the service\'s description'}
                onChange={(value, name) => this.setState({introducedDescription: value})}
              />
            </div>

            <div className='form-field'>
              <div className='labelContainer'>
                <FormattedMessage id='pricePerUnit' />
                <FontAwesomeIcon className='callRegistrationIcon' icon="id-card" />
              </div>
              <Textbox
                name={'new-service-pricePerUnit'}
                value={introducedPricePerUnit}
                extraClassName='textField'
                placeholder={'Type to introduce the ssn'}
                onChange={(value, name) => this.setState({introducedPricePerUnit: value})}
              />
            </div>

            <div className='form-field'>
              <div className='labelContainer'>
                <FormattedMessage id='unit' />
                <FontAwesomeIcon className='callRegistrationIcon' icon="id-card" />
              </div>
              <Textbox
                name={'new-service-Unit'}
                value={introducedUnit}
                extraClassName='textField'
                placeholder={'Type to introduce the type of unit'}
                onChange={(value, name) => this.setState({introducedUnit: value})}
              />
            </div>

            <div className='form-field'>
              <div className='labelContainer'>
                <FormattedMessage id='currency' />
                <FontAwesomeIcon className='callRegistrationIcon' icon="building" />
              </div>
              <DropdownList
                name={'caller-companiesDropdownList'}
        	      dataSource={dbCurrencys}
                value={selectedCurrency}
                dataTextField={'name'}
                dataValueField={'id'}
                filter={'contains'}
                searchPlaceholder='Service'
                onChange={(val, name) => this.setState({selectedCurrency: val})}
                extraClassName='form-dropdown'
              />
            </div>

            <center>
              <Button
                name={'Save-NewService'}
                enable={true}
                icon={'save'}
                primary={true}
                extraClassName={'form-button'}
                onClick={(name) => this.createService()}
              >
                <FormattedMessage id='save' />
              </Button>
            </center>
          </Modal>

        </div>

        <Loader show={showLoader} />
      </div>
    )
  }

  handleCloseModal() {
    this.setState({
      showModal: false
    })
  }

  createService() {
    const {
      Services = [],
      introducedName = '',
      introducedDescription = '',
      introducedPricePerUnit = '',
      introducedUnit = '',
      selectedCurrency = null,
      dbCurrencys = [],
    } = this.state

    const {
      intl = {},
      onSuccess
    } = this.props

    this.setState({ showLoader: true })

    const selectedCurrencyName = dbCurrencys.find((c) => c.id === selectedCurrency).name

    createService({
      name: introducedName,
      description: introducedDescription,
      pricePerUnit: introducedPricePerUnit,
      unit: introducedUnit,
      currency: selectedCurrencyName
    })
      .then((service) => {
        if (service.error) {
          return this.setState({
            alertShow: true,
            alertType: 'error',
            alertTitle: intl.formatMessage({ id: 'error'}),
            alertMssg: service.error,
            showLoader: false
          })
        } else {
          getServices()
            .then((services) => this.setState({
              services,
              showLoader: false,
              showModal: false
            }))
        }
        onSuccess && onSuccess(service)
      })
  }

}

export default injectIntl(Services);
