import React, {Component} from 'react'
import { FormattedMessage, connect } from 'lib'
import { injectIntl } from 'react-intl'
import Simplert from 'react-simplert'

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

import { getResponsibles, createResponsible } from 'actions/responsibles'

const mapStateToProps = (state) => ({
  myPrimaryTenant: getState().user.primaryTenant,
  myActiveTenant: getState().user.activeTenant,
  myEmail: getState().user.email,
  myRole: getState().user.role,
})

class Responsibles extends Component {

  constructor(props) {
    super(props)
    const { myActiveTenant = '', myEmail = '' } = props
    this.state = {
      showModal: false,
      showLoader: false,
      responsibles: [],
      name: '',
      email: '',
      phoneNo: '',
      alertShow: false,
      alertType: '',
      alertTitle: '',
      alertMssg: ''
    }
    this.handleCloseModal = this.handleCloseModal.bind(this)
  }

  componentDidMount() {
    getResponsibles()
      .then((res) => {
        if (res.error) {
          return this.setState({
            alertShow: true,
            alertType: 'error',
            alertTitle: 'Error',
            alertMssg: res.error
          })
        } else {
          return this.setState({ responsibles: res })
        }
      })
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
      responsibles = [],
      showModal = false,
      showLoader = false,
      name = '',
      email = '',
      phoneNo = '',
      alertShow = false,
      alertType = 'info',
      alertTitle = 'Title',
      alertMssg = 'No message'
    } = this.state

    return (
      <div className='responsibles'>

        <Simplert
          showSimplert={alertShow}
          type={alertType}
          title={alertTitle}
          message={alertMssg}
          onClose={() => this.setState({alertShow: false})}
        />

        <div className='form-field'>
          <span>Responsibles</span>
          <Grid
            gridId={'responsiblesGrid'}
            columns={
              [{
                field: "name",
                headerAttributes: {
                  "class": "responsibles-grid-thead-cell",
                  style: "text-align: center; font-size: 14px; width: calc(3/12 * 100%)"
                },
                title: 'Name'
              },{
                field: "email",
                headerAttributes: {
                  "class": "responsibles-grid-thead-cell",
                  style: "text-align: center; font-size: 14px; width: calc(4/12 * 100%)"
                },
                title: 'Email'
              },{
                field: "phoneNo",
                headerAttributes: {
                  "class": "responsibles-grid-thead-cell",
                  style: "text-align: center; font-size: 14px; width: calc(3/12 * 100%)"
                },
                title: 'Phone No'
              }, {
                field: "responsibleId",
                headerAttributes: {
                  "class": "responsibles-grid-thead-cell",
                  style: "text-align: center; font-size: 14px; width: calc(2/12 * 100%)"
                },
                title: 'Resp Id'
              }]
            }
            dataSource={responsibles}
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
        	    fileName: "Responsibles.xlsx",
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
                id: 'createResponsible'
              })
            }
          >
            <div className='form-field'>
              <FormattedMessage id='companyName' />
              <Textbox
                name={'create-responsible-name'}
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
                name={'create-responsible-email'}
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
              <FormattedMessage id='phoneNo' />
              <Textbox
                name={'create-responsible-phone'}
                value={phoneNo}
                extraClassName='textField'
                placeholder={
                  intl.formatMessage({
                    id: 'phoneNo'
                  })
                }
                onChange={(value, name) => this.setState({phoneNo: value})}
              />
            </div>

            <center>
              <Button
                name={'Save-Responsible'}
                enable={true}
                icon={'save'}
                primary={true}
                extraClassName={'form-button'}
                onClick={(name) => this.createResponsible()}
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

  createResponsible() {

    const {
      myPrimaryTenant = '',
      myActiveTenant = ''
    } = this.props

    const {
      name = '',
      email = '',
      phoneNo = ''
    } = this.state

    this.setState({ showLoader: true })

    createResponsible({
      name,
      email,
      phoneNo
    })
      .then(() => getResponsibles())
      .then((responsibles) => {
        if (responsibles.error) {
          return this.setState({
            alertShow: true,
            alertType: 'error',
            alertTitle: 'Error',
            alertMssg: res.error,
            showModal: false,
            showLoader: false,
          })
        }
        this.setState({ showModal: false, showLoader: false, responsibles, name: '', email: '', phoneNo: '' })
      })
  }
}

export default injectIntl(connect(mapStateToProps)(Responsibles));
