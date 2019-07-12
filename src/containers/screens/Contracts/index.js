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


import { getContracts, createContract } from 'actions/contracts'
import { getServices } from 'actions/services'
import { getCompanies } from 'actions/companies'

import { CURRENCYES } from 'constants/actions-type'

import styles from './index.scss'
import { template, toolbarTemplate } from './kendo-templates'
import DisplayService from './DisplayService'

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
      openService: '',
      serviceSelected: {},
      newServices: [],
      servicePricePerUnit: 0,
      currencyes: [],
      selectedCurrency: '',
      servicesRowNumber: [0],
      servicesSelected: [{name: '', pricePerUnit: 0, currency: '', unit: ''}],
    }

    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.createContract = this.createContract.bind(this);
    this.handleViewService = this.handleViewService.bind(this);
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
      .then(()=> this.handleViewService())

    this.handleExcel()

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
      alertMssg = 'No message',
      openService = '',
      serviceSelected = {},
      newServices = [],
      servicePricePerUnit = 0,
      currencyes = [],
      selectedCurrency = 'Lei',
      servicesRowNumber = [0],
      servicesSelected = [{name: '', pricePerUnit: 0, currency: '', unit: ''}],
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
                title: 'Services (Name)'
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

            <div className='form-field servicesSection-newContract'>
              <div className='addServices'>
                <FormattedMessage id='services' />
                <Button
                  name={'addServices-newContract'}
                  enable={true}
                  icon={'plus'}
                  primary={true}
                  extraClassName={'addServicesButton'}
                  onClick={() => {
                    const {
                      servicesRowNumber,
                      servicesSelected,
                    } = this.state

                    let servicesRowNumberCopy = servicesRowNumber.slice();
                    servicesRowNumberCopy.push(servicesRowNumber[servicesRowNumber.length-1]+1); // add the next row number

                    let servicesSelectedCopy = servicesSelected.slice()
                    servicesSelectedCopy.push({name: '', pricePerUnit: 0, currency: '', unit: ''})

                    this.setState({
                      servicesRowNumber: servicesRowNumberCopy,
                      servicesSelected: servicesSelectedCopy
                    })

                  }}
                >
                  {/* <FormattedMessage id='addService' /> */}
                </Button>
              </div>

              <div className='servicesSection col-xs-12'>
                <div className='servicesSectionHeader col-xs-12'>
                  <div className='sName col-xs-12 col-sm-4 col-md-4'><FormattedMessage id='name' /></div>
                  <div className='sPricePerUnit col-xs-12 col-sm-2 col-md-2'><FormattedMessage id='pricePerUnit' /></div>
                  <div className='sCurrency col-xs-12 col-sm-3 col-md-3'><FormattedMessage id='currency' /></div>
                  <div className='sUnit col-xs-12 col-sm-2 col-md-2'><FormattedMessage id='unit' /></div>
                  <div className='sUnit col-xs-12 col-sm-1 col-md-1'></div>
                </div>
                <div className='col-xs-12'>
                  {

                    servicesRowNumber.map((sRow) => {

                      return (
                        <div key={sRow} className='servicesSectionContent col-xs-12'>
                          <div className='servicesList col-xs-12 col-sm-4 col-md-4'>
                            <DropdownList
                              name={'servicesList'+sRow}
                              dataSource={[
                                { _id: 'none', name: '--Select--' },
                                ...services
                              ]}
                              value={servicesSelected[sRow]._id || 'none'}
                              dataTextField={'name'}
                              dataValueField={'_id'}
                              filter={'contains'}
                              searchPlaceholder='Service'
                              extraClassName='form-dropdown'
                              onChange={(val, name) => {
                                let servicesSelectedCopy;
                                let serviceObj;

                                if(!val) {
                                  return;
                                }
                                // When we choose "Select Type" for the Name of the service we want to clear the entire row
                                 if(val === 'none') {
                                  servicesSelectedCopy = servicesSelected.slice();
                                  serviceObj = services.find((service) => service._id === val);

                                  servicesSelectedCopy[sRow]._id = '';
                                  servicesSelectedCopy[sRow].name = '';
                                  servicesSelectedCopy[sRow].pricePerUnit = 0;
                                  servicesSelectedCopy[sRow].currency = '';
                                  servicesSelectedCopy[sRow].unit = '';
                                }
                                else {
                                  servicesSelectedCopy = servicesSelected.slice();
                                  serviceObj = services.find((service) => service._id === val);

                                  servicesSelectedCopy[sRow]._id = serviceObj._id;
                                  servicesSelectedCopy[sRow].name = serviceObj.name;
                                  servicesSelectedCopy[sRow].pricePerUnit = serviceObj.pricePerUnit;
                                  servicesSelectedCopy[sRow].currency = serviceObj.currency;
                                  servicesSelectedCopy[sRow].unit = serviceObj.unit;
                                }
                                this.setState({ servicesSelected: servicesSelectedCopy })
                              }}
                            />
                          </div>
                          <div className='servicePricePerUnit col-xs-12 col-sm-2 col-md-2'>
                            <Textbox
                              name={'servicePricePerUnit' +sRow}
                              value={servicesSelected[sRow].pricePerUnit}
                              extraClassName='textField'
                              onChange={(value, name) => {
                                let servicesSelectedCopy = servicesSelected.slice();
                                servicesSelectedCopy[sRow].pricePerUnit = value
                                this.setState({servicesSelected: servicesSelectedCopy})
                              }}
                            />
                          </div>
                          <div className='servicesCurrency col-xs-12 col-sm-3 col-md-3'>
                            <DropdownList
                              name={'servicesCurrency' +sRow}
                              dataSource={CURRENCYES}
                              value={servicesSelected[sRow].currency}
                              dataTextField={'name'}
                              dataValueField={'id'}
                              filter={'contains'}
                              extraClassName='form-dropdown'
                              onChange={(val, name) => {
                                // console.log(val);
                                // this.setState({selectedCurrency: val})
                              }}
                            />
                          </div>

                          <div className='servicesUnit col-xs-12 col-sm-2 col-md-2'>{servicesSelected[sRow].unit}</div>

                          <div className='addServices col-xs-12 col-sm-1 col-md-1'>
                            {
                              servicesRowNumber.length>1 &&
                              <Button
                                name={'deleteServices'+sRow}
                                enable={true}
                                icon={'delete'}
                                primary={true}
                                extraClassName={'addServicesButton'}
                                onClick={() => {
                                  const {
                                    servicesRowNumber,
                                    servicesSelected,
                                  } = this.state
                                  let servicesRowNumberCopy;
                                  let servicesSelectedCopy;

                                  //delete the service from the array that constains the already selected services
                                    servicesRowNumberCopy = servicesRowNumber.slice()
                                    servicesRowNumberCopy.splice(sRow,1);

                                    for(let i = sRow; i<servicesRowNumberCopy.length ; i++)
                                    {
                                      servicesRowNumberCopy[i]--;
                                    }

                                    servicesSelectedCopy = servicesSelected.slice()
                                    servicesSelectedCopy.splice(sRow,1);
                                    if(sRow.length ==0) // sRow has at least 1 element (sRow == [0])
                                    {
                                      servicesSelectedCopy[0]=0;
                                    }

                                  this.setState({
                                    servicesRowNumber: servicesRowNumberCopy,
                                    servicesSelected: servicesSelectedCopy
                                  })
                                  return;
                                }}
                              />
                            }
                          </div>

                        </div>
                      )
                    })
                  }
                </div>
              </div>
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

          <Modal
              visible={openService !== '' ? true : false}
              onClose={() => this.setState({openService: ''})}
              title={
                intl.formatMessage({
                  id: 'service'
                })
              }
            >

              <DisplayService
                onClose={() => this.setState({openService: ''})}
                serviceSelected={serviceSelected}
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

  createContract() {

    const {
      services = [],
      companies = [],
      selectedCompany = null,
      servicesSelected = [],
      introducedContractNumber = '',
      introducedStartDate = new Date(),
      introducedEndDate = new Date(),
    } = this.state

    const comment = this.refs.newContractComment.value;

    const newServices = servicesSelected.map((sS) => {
      return services.find((s) => s._id === sS._id)
    })

    if (!introducedContractNumber || !selectedCompany || !servicesSelected[0]._id) {
      alert('Campuri necompletate');
      return;
    } else {


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

  handleViewService() {
    const self = this
    $(".servicesName").on('click', function(e){
      const { services } = self.state
      var serviceName = $(this).text().trim();
      const serviceSelected = services.find((srv) => srv.name === serviceName)
      self.setState({openService: serviceName, serviceSelected})

    })
  }

  handleExcel() {
    $(".k-grid-excel").on('click', function(e){

         e.preventDefault();
         e.stopPropagation();

        var grid = $("#contractsGrid").getKendoGrid();
        var rows = [{
          cells: [
            {value: 'ContractNumber'},
            {value: 'Company'},
            {value: 'StartDate'},
            {value: 'EndDate'},
            {value: 'Comment'},
            {value: 'Service Name'},
            {value: 'Service Price Per Unit'},
            {value: 'Service Unit'},
            {value: 'Service Currency'},
          ]
        }];
        var trs = $("#contractsGrid").find('tr');
        for (var i = 1; i < trs.length; i++) {

            var dataItem = grid.dataItem(trs[i]);
            // console.log(dataItem);
            dataItem.services.forEach((srv) => {

              rows.push({
                cells: [
                  {value: dataItem.contractNumber},
                  {value: dataItem.company},
                  {value: dataItem.startDate},
                  {value: dataItem.endDate},
                  {value: dataItem.comment},
                  {value: srv.name},
                  {value: srv.pricePerUnit},
                  {value: srv.unit},
                  {value: srv.currency}
                ]
              })

            })

        }

        var workbook = new kendo.ooxml.Workbook({
          sheets: [
            {
              columns: [
                { autoWidth: true },
                { autoWidth: true }
              ],
              title: "Orders",
              rows: rows
            }
          ]
        });
        kendo.saveAs({dataURI: workbook.toDataURL(), fileName: "Test.xlsx"});
      });
  }


}

export default injectIntl(Contracts);
