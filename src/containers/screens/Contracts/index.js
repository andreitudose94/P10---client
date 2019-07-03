import React, {Component} from 'react'
import { FormattedMessage, connect } from 'lib'
import { injectIntl } from 'react-intl'
import moment from 'moment'
import { Redirect } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Simplert from 'react-simplert'

import DropdownList from 'components/DropdownList'
import Textbox from 'components/Textbox'
import DatePicker from 'components/DatePicker'
import Button from 'components/Button'
import Grid from 'components/Grid'
import Modal from 'components/Modal'
import Chart from 'components/Chart'
import MultiSelect from 'components/MultiSelect'
import Loader from 'components/Loader'

import styles from './index.scss'
import {
  template,
  toolbarTemplate,
} from './kendo-templates'

import { getContracts, createContract } from 'actions/contracts'
import { getServices } from 'actions/services'
import { getCompanies } from 'actions/companies'

class Contracts extends Component {

  constructor(props) {
    super(props)

    this.state = {
      contracts: [],
      services: [],
      companies: [],
      selectedServices: [],
      selectedCompany: null,
      introducedContractNumber: '',
      introducedStartDate: new Date(),
      introducedEndDate: new Date(),
      introducedComment: '',
      myServices: '',
      showModal: false,
      showLoader: false,
      alertShow: false,
      alertType: '',
      alertTitle: '',
      alertMssg: '',
    }

    this.handleCloseModal = this.handleCloseModal.bind(this)
    this.createContract = this.createContract.bind(this);
  }

  componentDidMount() {
    getContracts()
      .then((contracts) => {
        const processedContracts = contracts.map((c) => {
          return {
            ...c,
            startDate: moment(new Date(c.startDate)).format('lll'),
            endDate: moment(new Date(c.endDate)).format('lll')
          }
        })
        this.setState({ contracts: processedContracts })
      })
    getServices()
      .then((services) => this.setState({ services }))
    getCompanies()
      .then((companies) => this.setState({ companies }))
  }

  render() {

    const {
      contracts = [],
      services = [],
      companies = [],
      selectedServices = [],
      introducedContractNumber = '',
      selectedCompany = null,
      introducedStartDate = new Date(),
      introducedEndDate = new Date(),
      introducedComment = '',
      myServices = '',
      showModal = false,
      showLoader = false,
      alertShow = false,
      alertType = 'info',
      alertTitle = 'Title',
      alertMssg = 'No message'
    } = this.state

    const {
      intl = {}
    } = this.props

    return (
      <div className='contracts'>

        <Simplert
          showSimplert={alertShow}
          type={alertType}
          title={alertTitle}
          message={alertMssg}
          onClose={() => this.setState({alertShow: false})}
        />

        <div className='form-field'>
          <span>Contracts</span>
          <Grid
            gridId={'contractsGrid'}
            columns={
              [{
                field: "contractNumber",
                headerAttributes: {
                  "class": "contracts-grid-thead-cell",
                  style: "text-align: center; font-size: 14px; width: calc(2/12 * 100%)"
                },
                title: 'Contract Number'
              },{
                field: "company",
                headerAttributes: {
                  "class": "contracts-grid-thead-cell",
                  style: "text-align: center; font-size: 14px; width: calc(2/12 * 100%)"
                },
                title: 'Company'
              }, {
                field: "startDate",
                headerAttributes: {
                  "class": "contracts-grid-thead-cell",
                  style: "text-align: center; font-size: 14px; width: calc(2/12 * 100%)"
                },
                title: 'Start Date'
              }, {
                field: "endDate",
                headerAttributes: {
                  "class": "contracts-grid-thead-cell",
                  style: "text-align: center; font-size: 14px; width: calc(2/12 * 100%)"
                },
                title: 'End Date'
              }, {
                field: "comment",
                headerAttributes: {
                  "class": "contracts-grid-thead-cell",
                  style: "text-align: center; font-size: 14px; width: calc(2/12 * 100%)"
                },
                title: 'Comment'
              }, {
                field: "services",
                headerAttributes: {
                  "class": "contracts-grid-thead-cell",
                  style: "text-align: center; font-size: 14px; width: calc(2/12 * 100%)"
                },
                title: 'Services'
              }]
            }
            dataSource={contracts}
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
        	    fileName: "Contracts.xlsx",
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
                id: 'createContract'
              })
            }
          >

            <div className='form-field'>
              <div className='labelContainer'>
                <FormattedMessage id='contractNumber' />
                {/* <FontAwesomeIcon className='callRegistrationIcon' icon="building" /> */}
              </div>
              <Textbox
                name={'new-contract-number'}
                value={introducedContractNumber}
                extraClassName='textField'
                placeholder={'Type to introduce the contract\'s number'}
                onChange={(value, name) => this.setState({introducedContractNumber: value})}
              />
            </div>

            <div className='form-field'>
              <div className='labelContainer'>
                <FormattedMessage id='company' />
                {/* <FontAwesomeIcon className='callRegistrationIcon' icon="user" /> */}
              </div>
              <DropdownList
                name={'new-contract-company'}
        	      dataSource={companies}
                value={selectedCompany}
                dataTextField={'name'}
                dataValueField={'_id'}
                filter={'contains'}
                searchPlaceholder='Company'
                onChange={(val, name) => this.setState({selectedCompany: val})}
                extraClassName='form-dropdown'
              />
            </div>

            <div className='newContractDate'>
              <div className='form-field date col-12 col-sm-6 col-md-6 col-lg-6'>
                <div className='labelContainer'>
                  <FormattedMessage id='startDate' />
                  <FontAwesomeIcon className='newContractIcon' icon="calendar-check" />
                </div>
                <DatePicker
                  name={'startDate'}
                  value={introducedStartDate}
                  format={'MM/dd/yyyy'}
                  min={new Date()}
                  weekNumber={true}
                  start={'month'}
                  classDatePicker={'newContractDatePicker'}
                  onChange={(val, name) => this.setState({introducedStartDate: val})}
                />
              </div>

              <div className='form-field date col-12 col-sm-6 col-md-6 col-lg-6'>
                <div className='labelContainer'>
                  <FormattedMessage id='endDate' />
                  <FontAwesomeIcon className='newContractIcon' icon="calendar-check" />
                </div>
                <DatePicker
                  name={'endDate'}
                  value={introducedEndDate}
                  format={'MM/dd/yyyy'}
                  min={new Date()}
                  weekNumber={true}
                  start={'month'}
                  classDatePicker={'newContractDatePicker'}
                  onChange={(val, name) => this.setState({introducedEndDate: val})}
                />
              </div>
            </div>

            <div className='form-field'>
              <div className='labelContainer'>
                <FormattedMessage id='comment' />
                {/* <FontAwesomeIcon className='callRegistrationIcon' icon="building" /> */}
              </div>
              <textarea
                type="text"
                ref='newContractComment'
                placeholder="Type to introduce the comment"
              ></textarea>
            </div>

            <div className='form-field new-contract-services'>
              <FormattedMessage id='services' />
              <MultiSelect
                name={'new-contract-services'}
                dataSource={services}
                value={selectedServices}
                dataTextField={'name'}
                dataValueField={'_id'}
                enable={true}
                onSelect={(e, selected, name) => {
                  // if(selected.name === selectedServices) {
                  //   e.preventDefault()
                  // }
                }}
                onDeselect={(e, selected, name) => {
                  // if(selected.title === myActiveTenant) {
                  //   e.preventDefault()
                  // }
                }}
                onChange={(value, name) => this.setState({selectedServices: value})}
                filter={'startsWith'}
                ignoreCase={false}
                clearButton={true}
                autoWidth={true}
              />
            </div>

            <center>
              <Button
                name={'Save-NewContract'}
                enable={true}
                icon={'save'}
                primary={true}
                extraClassName={'form-button'}
                onClick={(name) => this.createContract()}
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

  createContract() {

    const {
      services = [],
      introducedContractNumber = '',
      selectedCompany = null,
      companies = [],
      introducedStartDate = new Date(),
      introducedEndDate = new Date(),
      selectedServices = [],
    } = this.state
    const comment = this.refs.newContractComment.value;

    const newServices = selectedServices.map((sS) => {
      return services.find((s) => s._id === sS)
    })

    const selectedCompanyName = companies.find((c) => c._id === selectedCompany).name
    this.setState({ showLoader: true })

    createContract({
      contractNumber: introducedContractNumber,
      company: selectedCompanyName,
      startDate: introducedStartDate,
      endDate: introducedEndDate,
      comment: comment,
      services: newServices
    })
      .then((contract) => {
        if (contract.error) {
          return this.setState({
            alertShow: true,
            alertType: 'error',
            alertTitle: intl.formatMessage({ id: 'error'}),
            alertMssg: contract.error,
            showLoader: false
          })
        } else {
          getContracts()
            .then((contracts) => {
              const processedContracts = contracts.map((c) => {
                return {
                  ...c,
                  startDate: moment(new Date(c.startDate)).format('lll'),
                  endDate: moment(new Date(c.endDate)).format('lll')
                }
              })
              this.setState({
                contracts: processedContracts,
                showLoader: false,
                showModal: false
              })
            })
        }
      })
  }
}

export default injectIntl(Contracts);
