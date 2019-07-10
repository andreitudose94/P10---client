import React, {Component} from 'react'
import { FormattedMessage, connect } from 'lib'
import { injectIntl } from 'react-intl'
import Simplert from 'react-simplert'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import NewService from './NewService'

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
    },
    this.handleCloseModal = this.handleCloseModal.bind(this)
    this.fetchServices = this.fetchServices.bind(this)
  }

  componentDidMount() {
    this.fetchServices()
  }

  fetchServices(){
    getServices()
      .then((services) => this.setState({ services }))
  }

  render() {

    const {
      intl = {},
      onSuccess,
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
      alertMssg = 'No message',
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
            <NewService
              onSuccess={onSuccess}
              onFetchServices={this.fetchServices}
              onCloseModal={this.handleCloseModal}
            />
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

}

export default injectIntl(Services);
