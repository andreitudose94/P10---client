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

import { getUsers } from 'actions/user'

class Users extends Component {

  constructor(props) {
    super(props)
    this.state = {
      users: [],
      showModal: false,
      name: '',
      email: '',
      tenantsList: [],
      role: ''
    }
    this.handleCloseModal = this.handleCloseModal.bind(this)
  }

  componentDidMount() {
    getUsers()
      .then((users) => this.setState({
        users
      }))
  }

  render() {
    const { intl = {} } = this.props
    const {
      users = [],
      showModal = false,
      name = '',
      email = '',
      tenantsList = [],
      role = ''
    } = this.state

    return (
      <div className='users'>
        <div className='form-field'>
          <span>Users</span>
          <Grid
            gridId={'usersGrid'}
            dataSource={users}
            rowTemplateId={'users-grid-template-id'}
            visibleHeader={false}
            pageable={{
              pageSize: 10
            }}
            toolbar={
              kendo.template($("#users-grid-toolbar-template-id").html())
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
        	    fileName: "Item Inventory.xlsx",
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
                dataSource={
                  [
                   { id: 'admin', name: "Administrator" },
                   { id: 'user', name: "User" }
                 ]
                }
                value={role}
                dataTextField={'name'}
                dataValueField={'id'}
                onChange={(value, name) => this.setState({role: value})}
                extraClassName='form-dropdown'
              />
            </div>
            <div className='form-field'>
              <FormattedMessage id='tenants' />
              <MultiSelect
                name={'pick-detail-ms'}
                dataSource={[
                  { id: 'admin', name: "Administrator" },
                  { id: 'user', name: "User" },
                  { id: 'guest', name: "Guest" }
                ]}
                value={[]}
                dataTextField={'name'}
                dataValueField={'id'}
                enable={true}
                onChange={(val, name) => {
                  console.log('val', val)
                }}
      	        onOpen={(name) => console.log('open')}
                onFocus={(name) => console.log('focusin')}
                onFocusOut={(name) => console.log('focusout')}
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
                onClick={(name) => alert('da')}
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
}

export default injectIntl(Users);
