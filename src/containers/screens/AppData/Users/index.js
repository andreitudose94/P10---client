import React, {Component} from 'react'
import { FormattedMessage, connect } from 'lib'
import { injectIntl } from 'react-intl'
import Simplert from 'react-simplert'

import NewUser from './NewUser'

import Grid from 'components/Grid'
import Modal from 'components/Modal'
import Button from 'components/Button'
import Textbox from 'components/Textbox'
import DropdownList from 'components/DropdownList'
import MultiSelect from 'components/MultiSelect'
import Loader from 'components/Loader'

import styles from './index.scss'
import {
  template,
  toolbarTemplate
} from './kendo-templates'

import { getUsers, createUser } from 'actions/user'

// e.g. a.paco.com$default => default
const getTenantSuffix = (tenantName) => {
  return tenantName.substr(tenantName.lastIndexOf('$') + 1)
}

const createTenantsDatasource = (tenants = []) => {
  return tenants.map((t) => ({
    ...t,
    titleDisplay: getTenantSuffix(t.title)
  }))
}

const mapStateToProps = (state) => ({
  myPrimaryTenant: getState().user.primaryTenant,
  myActiveTenant: getState().user.activeTenant,
  myTenants: getState().user.tenantsList,
  myEmail: getState().user.email,
  myRole: getState().user.role,
})

class Users extends Component {

  constructor(props) {
    super(props)
    const { myActiveTenant = '', myEmail = '' } = props
    this.state = {
      users: [],
      showModal: false,
      showLoader: false,
      name: '',
      email: '',
      role: 'User',
      selectedTenants: [myActiveTenant],
      alertShow: false,
      alertType: '',
      alertTitle: '',
      alertMssg: ''
    }
    this.handleCloseModal = this.handleCloseModal.bind(this)
    this.getPrelucratedUsers = this.getPrelucratedUsers.bind(this)
  }

  getPrelucratedUsers() {
    getUsers()
      .then((users) => {
        if (users.response) {
          this.setState({
            alertShow: true,
            alertType: 'error',
            alertTitle: 'Error',
            alertMssg: users.response.body.message
          })
        }
        const prelucreatedUsers = users.map((u) => {
          let str_tenantsList = ''
          u.tenantsList.forEach((t) => str_tenantsList += (getTenantSuffix(t.title) + ','))
          return {
            ...u,
            tenantsList: str_tenantsList.substr(0, str_tenantsList.length - 1)
          }
        })
        this.setState({ users: prelucreatedUsers })
      })
  }

  componentDidMount() {
    this.getPrelucratedUsers()
  }

  render() {

    const {
      intl = {},
      myPrimaryTenant = '',
      myActiveTenant = '',
      myTenants = '',
      myEmail = '',
      myRole = ''
    } = this.props

    const {
      users = [],
      showModal = false,
      showLoader = false,
      name = '',
      email = '',
      role = 'User',
      selectedTenants = [],
      alertShow = false,
      alertType = 'info',
      alertTitle = 'Title',
      alertMssg = 'No message'
    } = this.state

    return (
      <div className='users'>

        <Simplert
          showSimplert={alertShow}
          type={alertType}
          title={alertTitle}
          message={alertMssg}
          onClose={() => this.setState({alertShow: false})}
        />

        <div className='form-field'>
          <span>Users</span>
          <Grid
            gridId={'usersGrid'}
            columns={
              [{
                field: "email",
                headerAttributes: {
                  "class": "users-grid-thead-cell",
                  style: "text-align: center; font-size: 14px; width: calc(5/12 * 100%)"
                },
                title: 'Email'
              },{
                field: "role",
                headerAttributes: {
                  "class": "users-grid-thead-cell",
                  style: "text-align: center; font-size: 14px; width: calc(1/12 * 100%)"
                },
                title: 'Role'
              },{
                field: "name",
                headerAttributes: {
                  "class": "users-grid-thead-cell",
                  style: "text-align: center; font-size: 14px; width: calc(3/12 * 100%)"
                },
                title: 'Name'
              },{
                field: "tenantsList",
                headerAttributes: {
                  "class": "users-grid-thead-cell",
                  style: "text-align: center; font-size: 14px; width: calc(3/12 * 100%)"
                },
                title: 'Tenants'
              }]
            }
            dataSource={users}
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
        	    fileName: "Users.xlsx",
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
                id: 'createUser'
              })
            }
          >

            <NewUser
              myTenants={myTenants}
              myActiveTenant={myActiveTenant}
              myPrimaryTenant={myPrimaryTenant}
              myEmail={myEmail}
              onCreateTenantsDS={createTenantsDatasource}
              getPrelucratedUsers={this.getPrelucratedUsers}
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

export default injectIntl(connect(mapStateToProps)(Users));
