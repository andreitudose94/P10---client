import React, {Component} from 'react'
import { FormattedMessage, connect } from 'lib'
import { injectIntl } from 'react-intl'
import Simplert from 'react-simplert'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import NewCaller from './NewCaller'

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
    this.fetchCompanyAndCallers = this.fetchCompanyAndCallers.bind(this)
  }

  componentDidMount() {
    this.fetchCompanyAndCallers()
  }

  fetchCompanyAndCallers() {
    getCompanies()
      .then((companies) => this.setState({ companies }))
      .then(() => getCallers())
      .then((callers) => this.setState({ callers }))
  }

  render() {

    const {
      intl = {},
      onSuccess,
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

            <NewCaller
              companies={companies}
              onSuccess={onSuccess}
              fetchCompanyAndCallers={this.fetchCompanyAndCallers}
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

export default injectIntl(connect(mapStateToProps)(Callers));
