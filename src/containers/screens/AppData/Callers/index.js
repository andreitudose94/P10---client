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

import { getCallers, createCaller } from 'actions/callers'
import { getCompanies } from 'actions/companies'

const mapStateToProps = (state) => ({})

class Callers extends Component {

  constructor(props) {
    super(props)
    this.state = {
      selectedCompany: null,
      companies: [],
      callers: [],
      introducedSSN: '',
      introducedName: '',
      name: '',
      showModal: false,
      showLoader: false,
      alertShow: false,
      alertType: '',
      alertTitle: '',
      alertMssg: '',
    }
    this.handleCloseModal = this.handleCloseModal.bind(this)
  }

  componentDidMount() {
    getCompanies()
      .then((companies) => this.setState({ companies }))
      .then(() => getCallers())
      .then((callers) => this.setState({ callers }))
  }

  render() {

    const {
      intl = {}
    } = this.props

    const {
      companies = [],
      selectedCompany = null,
      callers = [],
      showModal = false,
      showLoader = false,
      name = '',
      introducedSSN = '',
      introducedName = '',
      alertShow = false,
      alertType = 'info',
      alertTitle = 'Title',
      alertMssg = 'No message'
    } = this.state

    return (
      <div className='callers'>

        <Simplert
          showSimplert={alertShow}
          type={alertType}
          title={alertTitle}
          message={alertMssg}
          onClose={() => this.setState({alertShow: false})}
        />

        <div className='form-field'>
          <span>Callers</span>
          <Grid
            gridId={'callersGrid'}
            columns={
              [{
                field: "company",
                headerAttributes: {
                  "class": "callers-grid-thead-cell",
                  style: "text-align: center; font-size: 14px; width: calc(5/12 * 100%)"
                },
                title: 'Company'
              },{
                field: "name",
                headerAttributes: {
                  "class": "callers-grid-thead-cell",
                  style: "text-align: center; font-size: 14px; width: calc(4/12 * 100%)"
                },
                title: 'Name'
              }, {
                field: "cnp",
                headerAttributes: {
                  "class": "callers-grid-thead-cell",
                  style: "text-align: center; font-size: 14px; width: calc(3/12 * 100%)"
                },
                title: 'CNP'
              }]
            }
            dataSource={callers}
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
        	    fileName: "Callers.xlsx",
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
                id: 'createCaller'
              })
            }
          >

            <div className='form-field'>
              <div className='labelContainer'>
                <FormattedMessage id='company' />
                <FontAwesomeIcon className='callRegistrationIcon' icon="building" />
              </div>
              <DropdownList
                name={'caller-companiesDropdownList'}
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

            <div className='form-field'>
              <div className='labelContainer'>
                <FormattedMessage id='name' />
                <FontAwesomeIcon className='callRegistrationIcon' icon="user" />
              </div>
              <Textbox
                name={'new-caller-name'}
                value={introducedName}
                extraClassName='textField'
                placeholder={'Type to introduce the caller\'s name'}
                onChange={(value, name) => this.setState({introducedName: value})}
              />
            </div>

            <div className='form-field'>
              <div className='labelContainer'>
                <FormattedMessage id='ssn-described' />
                <FontAwesomeIcon className='callRegistrationIcon' icon="id-card" />
              </div>
              <Textbox
                name={'new-caller-ssn'}
                value={introducedSSN}
                extraClassName='textField'
                placeholder={'Type to introduce the ssn'}
                onChange={(value, name) => this.setState({introducedSSN: value})}
              />
            </div>

            <center>
              <Button
                name={'Save-NewUser'}
                enable={true}
                icon={'save'}
                primary={true}
                extraClassName={'form-button'}
                onClick={(name) => this.createCaller()}
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

  createCaller() {
    const {
      companies = [],
      selectedCompany = null,
      introducedSSN = '',
      introducedName = ''
    } = this.state

    const {
      intl = {},
      onSuccess
    } = this.props

    this.setState({ showLoader: true })

    const selectedCompanyName = companies.find((c) => c._id === selectedCompany).name

    createCaller({
      name: introducedName,
      ssn: introducedSSN,
      company: selectedCompanyName,
      companyId: selectedCompany,
    })
      .then((caller) => {
        // console.log('caller: ', caller);
        if (caller.error) {
          return this.setState({
            alertShow: true,
            alertType: 'error',
            alertTitle: intl.formatMessage({ id: 'error'}),
            alertMssg: caller.error,
            showLoader: false
          })
        } else {
          this.setState({ showLoader: false, showModal: false })
        }
        onSuccess && onSuccess(caller)
      })
  }

}

export default injectIntl(connect(mapStateToProps)(Callers));
