import React, {Component} from 'react'
import { FormattedMessage, connect } from 'lib'
import { injectIntl } from 'react-intl'
import Simplert from 'react-simplert'

import NewCompany from './NewCompany'

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

import { getCompanies, createCompany } from 'actions/companies'

const mapStateToProps = (state) => ({
  myPrimaryTenant: getState().user.primaryTenant,
  myActiveTenant: getState().user.activeTenant,
  myEmail: getState().user.email,
  myRole: getState().user.role,
})

class Companies extends Component {

  constructor(props) {
    super(props)
    const { myActiveTenant = '', myEmail = '' } = props
    this.state = {
      showModal: false,
      showLoader: false,
      companies: [],
      name: '',
      email: '',
      address: '',
      alertShow: false,
      alertType: '',
      alertTitle: '',
      alertMssg: ''
    }
    this.handleCloseModal = this.handleCloseModal.bind(this)
    this.fetchCompanies = this.fetchCompanies.bind(this)
  }

  componentDidMount() {
    this.fetchCompanies()
  }

  fetchCompanies() {
    getCompanies()
      .then((companies) => this.setState({ companies }))
  }

  render() {

    const {
      intl = {},
      myPrimaryTenant = '',
      myActiveTenant = '',
      myEmail = '',
      myRole = ''
    } = this.props

    const {
      companies = [],
      showModal = false,
      showLoader = false,
      name = '',
      email = '',
      address = '',
      alertShow = false,
      alertType = 'info',
      alertTitle = 'Title',
      alertMssg = 'No message'
    } = this.state

    return (
      <div className='companies'>

        <Simplert
          showSimplert={alertShow}
          type={alertType}
          title={alertTitle}
          message={alertMssg}
          onClose={() => this.setState({alertShow: false})}
        />

        <div className='form-field'>
          <span>Companies</span>
          <Grid
            gridId={'companiesGrid'}
            columns={
              [{
                field: "name",
                headerAttributes: {
                  "class": "companies-grid-thead-cell",
                  style: "text-align: center; font-size: 14px; width: calc(2/12 * 100%)"
                },
                title: 'Name'
              },{
                field: "email",
                headerAttributes: {
                  "class": "companies-grid-thead-cell",
                  style: "text-align: center; font-size: 14px; width: calc(4/12 * 100%)"
                },
                title: 'Email'
              },{
                field: "address",
                headerAttributes: {
                  "class": "companies-grid-thead-cell",
                  style: "text-align: center; font-size: 14px; width: calc(6/12 * 100%)"
                },
                title: 'Address'
              }]
            }
            dataSource={companies}
            rowTemplate={template}
            visibleHeader={true}
            pageable={{
              pageSize: 10
            }}
            toolbar={
              myRole === "Admin" && toolbarTemplate
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
        	    fileName: "Companies.xlsx",
        	    allPages: true
        	  }}
        	  excelButtonTitle={'EXCEL'}
            createButtonTitle={myRole === "Admin" && 'toolbar-add-btn'}
            onCreate_Custom={() => this.setState({showModal: true})}
          />

          <Modal
            visible={showModal}
            onClose={this.handleCloseModal}
            title={
              intl.formatMessage({
                id: 'createCompany'
              })
            }
          >

            <NewCompany
              onFetchCompanies={this.fetchCompanies}
              onCloseModal={this.handleCloseModal}
            />
            {/*<div className='form-field'>
              <FormattedMessage id='companyName' />
              <Textbox
                name={'create-company-name'}
                value={name}
                extraClassName='textField'
                placeholder={
                  intl.formatMessage({
                    id: 'name'
                  })
                }
                onChange={(value, name) => this.setState({name: value})}
              />
            </div>
            <div className='form-field'>
              <FormattedMessage id='email-address' />
              <Textbox
                name={'create-company-email'}
                value={email}
                extraClassName='textField'
                placeholder={
                  intl.formatMessage({
                    id: 'email'
                  })
                }
                onChange={(value, name) => this.setState({email: value})}
              />
            </div>
            <div className='form-field'>
              <FormattedMessage id='address' />
              <Textbox
                name={'create-company-address'}
                value={address}
                extraClassName='textField'
                placeholder={
                  intl.formatMessage({
                    id: 'address'
                  })
                }
                onChange={(value, name) => this.setState({address: value})}
              />
            </div>

            <center>
              <Button
                name={'Save-Company'}
                enable={true}
                icon={'save'}
                primary={true}
                extraClassName={'form-button'}
                onClick={(name) => this.createCompany()}
              >
                <FormattedMessage id='save' />
              </Button>
            </center>*/}
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

  createCompany() {

    const {
      myPrimaryTenant = '',
      myActiveTenant = ''
    } = this.props

    const {
      name = '',
      email = '',
      address = ''
    } = this.state

    this.setState({ showLoader: true })

    return createCompany({
      name,
      email,
      address,
      primaryTenant: myPrimaryTenant,
      activeTenant: myActiveTenant
    })
      .then((res) => res.error &&
        this.setState({
          alertShow: true,
          alertType: 'error',
          alertTitle: 'Error',
          alertMssg: res.error,
        })
      )
      .then(() => getCompanies())
      .then((companies) =>  {
        if (companies.error) {
          return this.setState({
            alertShow: true,
            alertType: 'error',
            alertTitle: 'Error',
            alertMssg: companies.error,
          })
        } else {
          return this.setState({
            showModal: false,
            showLoader: false,
            companies,
            name: '',
            email: '',
            address: ''
          })
        }
      })
  }
}

export default injectIntl(connect(mapStateToProps)(Companies));
