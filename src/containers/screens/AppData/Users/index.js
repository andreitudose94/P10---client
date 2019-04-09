import React, {Component} from 'react'
import { FormattedMessage, connect } from 'lib'
import { injectIntl } from 'react-intl'

import Grid from 'components/Grid'
import Modal from 'components/Modal'
import Button from 'components/Button'
import Textbox from 'components/Textbox'
import DropdownList from 'components/DropdownList'
import MultiSelect from 'components/MultiSelect'
import styles from './index.scss'

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
})

class Users extends Component {

  constructor(props) {
    super(props)
    const { myActiveTenant = '', myEmail = '' } = props
    this.state = {
      users: [],
      showModal: false,
      name: '',
      email: '',
      role: 'User',
      selectedTenants: [myActiveTenant]
    }
    this.handleCloseModal = this.handleCloseModal.bind(this)
    this.createUser = this.createUser.bind(this)
  }

  componentDidMount() {
    getUsers()
      .then((users) => {
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

  render() {

    const {
      intl = {},
      myPrimaryTenant = '',
      myActiveTenant = '',
      myTenants = '',
      myEmail = '',
    } = this.props

    const {
      users = [],
      showModal = false,
      name = '',
      email = '',
      role = 'User',
      selectedTenants = []
    } = this.state

    return (
      <div className='users'>
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
            rowTemplateId={'users-grid-template-id'}
            visibleHeader={true}
            pageable={{
              pageSize: 10
            }}
            toolbar={
              role === "Admin" && kendo.template($("#users-grid-toolbar-template-id").html())
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
            createButtonTitle={role === "Admin" && 'toolbar-add-btn'}
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
            <div className='form-field'>
              <FormattedMessage id='username' />
              <Textbox
                name={'create-user-name'}
                value={name}
                extraClassName='textField'
                placeholder={'Name'}
                onChange={(value, name) => this.setState({name: value})}
              />
            </div>
            <div className='form-field'>
              <FormattedMessage id='email-address' />
              <Textbox
                name={'create-user-email'}
                value={email}
                extraClassName='textField'
                placeholder={'Email'}
                onChange={(value, name) => this.setState({email: value})}
              />
            </div>
            <div className='form-field'>
              <FormattedMessage id='role' />
              <DropdownList
                name={'create-user-role'}
                dataSource={[
                  { id: 'Admin', name: "Admin" },
                  { id: 'User', name: "User" },
                  { id: 'Guest', name: "Guest" }
                ]}
                value={role}
                dataTextField={'name'}
                dataValueField={'id'}
                onChange={(value, name) => this.setState({role: value})}
                extraClassName='form-dropdown'
              />
            </div>
            <div className='form-field create-user-tenants-row'>
              <FormattedMessage id='tenants' />
              <MultiSelect
                name={'create-user-tenants'}
                dataSource={createTenantsDatasource(myTenants)}
                value={selectedTenants}
                dataTextField={'titleDisplay'}
                dataValueField={'title'}
                enable={true}
                onSelect={(e, selected, name) => {
                  if(selected.title === myActiveTenant) {
                    e.preventDefault()
                  }
                }}
                onDeselect={(e, selected, name) => {
                  if(selected.title === myActiveTenant) {
                    e.preventDefault()
                  }
                }}
                onChange={(value, name) => this.setState({selectedTenants: value})}
                filter={'startsWith'}
                ignoreCase={false}
                clearButton={true}
                autoWidth={true}
              />
            </div>

            <center>
              <Button
                name={'Save'}
                enable={true}
                icon={'save'}
                primary={true}
                extraClassName={'form-button'}
                onClick={(name) => this.createUser()}
              >
                <FormattedMessage id='save' />
              </Button>
            </center>
          </Modal>

        </div>
      </div>
    )
  }

  handleCloseModal() {
    this.setState({
      showModal: false
    })
  }

  createUser() {

    const {
      myPrimaryTenant = '',
      myActiveTenant = '',
      myTenants = '',
      myEmail = '',
    } = this.props

    const {
      name = '',
      email = '',
      role = '',
      selectedTenants = []
    } = this.state

    const newUserTenants = selectedTenants.map((t) => {
      return myTenants.find((mT) => mT.title === t)
    })

    createUser({
      name,
      email,
      role,
      primaryTenant: myPrimaryTenant,
      activeTenant: myActiveTenant,
      tenantsList: newUserTenants
    })
      .then(() => getUsers())
      .then((users) => this.setState({ users, showModal: false }))
  }
}

export default injectIntl(connect(mapStateToProps)(Users));
