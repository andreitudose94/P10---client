import React, {Component} from 'react'
import { FormattedMessage, connect } from 'lib'
import { injectIntl } from 'react-intl'
import Simplert from 'react-simplert'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import Button from 'components/Button'
import Textbox from 'components/Textbox'
import DropdownList from 'components/DropdownList'
import Loader from 'components/Loader'

import styles from './index.scss'

import { createCaller } from 'actions/callers'

class NewCaller extends Component {

  constructor(props) {
    super(props)
    this.state ={
      selectedCompany: '',
      introducedSSN: '',
      introducedName: '',
      showLoader: false,
    }
  }

  render() {

    const {
      selectedCompany = '',
      introducedSSN = '',
      introducedName = '',
      showLoader = false,
    } = this.state

    const {
      intl = {},
      companies = [],
    } = this.props

    return (
      <div className='callers'>
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

        <Loader show={showLoader} />
      </div>
    )
  }

  createCaller() {
    const {
      selectedCompany = null,
      introducedSSN = '',
      introducedName = ''
    } = this.state

    const {
      intl = {},
      companies = [],
      onSuccess,
      onCloseModal,
      fetchCompanyAndCallers,
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
        if (caller.error) {
          onCloseModal && onCloseModal()
          return this.setState({
            alertShow: true,
            alertType: 'error',
            alertTitle: intl.formatMessage({ id: 'error'}),
            alertMssg: caller.error,
            showLoader: false
          })
        } else {
          this.setState({ showLoader: false })
          onCloseModal && onCloseModal()
        }
        onSuccess && onSuccess(caller)
        fetchCompanyAndCallers && fetchCompanyAndCallers()
      })
  }

}

export default injectIntl(NewCaller);
