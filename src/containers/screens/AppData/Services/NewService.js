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

import { createService } from 'actions/services'

class NewService extends Component {

  constructor(props) {
    super(props)
    this.state = {
      introducedName: '',
      introducedDescription: '',
      introducedPricePerUnit: '',
      introducedUnit: '',
      selectedCurrency: '',
      showLoader: false,
      alertShow: false,
      alertType: '',
      alertTitle: '',
      alertMssg: '',
      dbCurrencys: [
        {id: 'none', name: 'Select a currency'},
        {id: 'euro', name: '€'},
        {id: 'dolar', name: '$'},
        {id: 'leu', name: 'LEI'}
      ]
    },
    this.createService = this.createService.bind(this);

  }

  render() {

    const {
      intl = {}
    } = this.props

    const {
      showLoader = false,
      introducedName = '',
      introducedDescription = '',
      introducedPricePerUnit = '',
      introducedUnit = '',
      selectedCurrency = '',
      alertShow = false,
      alertType = 'info',
      alertTitle = 'Title',
      alertMssg = 'No message',
      dbCurrencys = [],
    } = this.state

    return (
      <div className='newService'>

        <Simplert
          showSimplert={alertShow}
          type={alertType}
          title={alertTitle}
          message={alertMssg}
          onClose={() => this.setState({alertShow: false})}
        />

        <div className='form-field'>
          <div className='labelContainer'>
            <FormattedMessage id='name' />
          </div>
          <Textbox
            name={'new-service-name'}
            value={introducedName}
            extraClassName='textField'
            placeholder={'Type to introduce the service\'s name'}
            onChange={(value, name) => this.setState({introducedName: value})}
          />
        </div>

        <div className='form-field'>
          <div className='labelContainer'>
            <FormattedMessage id='description' />
          </div>
          <Textbox
            name={'new-caller-description'}
            value={introducedDescription}
            extraClassName='textField'
            placeholder={'Type to introduce the service\'s description'}
            onChange={(value, name) => this.setState({introducedDescription: value})}
          />
        </div>

        <div className='form-field'>
          <div className='labelContainer'>
            <FormattedMessage id='pricePerUnit' />
          </div>
          <Textbox
            name={'new-service-pricePerUnit'}
            value={introducedPricePerUnit}
            extraClassName='textField'
            placeholder={'Type to introduce the ssn'}
            onChange={(value, name) => this.setState({introducedPricePerUnit: value})}
          />
        </div>

        <div className='form-field'>
          <div className='labelContainer'>
            <FormattedMessage id='unit' />
          </div>
          <Textbox
            name={'new-service-Unit'}
            value={introducedUnit}
            extraClassName='textField'
            placeholder={'Type to introduce the type of unit'}
            onChange={(value, name) => this.setState({introducedUnit: value})}
          />
        </div>

        <div className='form-field'>
          <div className='labelContainer'>
            <FormattedMessage id='currency' />
          </div>
          <DropdownList
            name={'caller-companiesDropdownList'}
    	      dataSource={dbCurrencys}
            value={selectedCurrency}
            dataTextField={'name'}
            dataValueField={'id'}
            filter={'contains'}
            searchPlaceholder='Service'
            onChange={(val, name) => this.setState({selectedCurrency: val})}
            extraClassName='form-dropdown'
          />
        </div>

        <center>
          <Button
            name={'Save-NewService'}
            enable={true}
            icon={'save'}
            primary={true}
            extraClassName={'form-button'}
            onClick={(name) => this.createService()}
          >
            <FormattedMessage id='save' />
          </Button>
        </center>
        <Loader show={showLoader} />
      </div>
    )
  }

  createService() {
    const {
      Services = [],
      introducedName = '',
      introducedDescription = '',
      introducedPricePerUnit = '',
      introducedUnit = '',
      selectedCurrency = null,
      dbCurrencys = [],
    } = this.state

    const {
      intl = {},
      onSuccess,
      onFetchServices,
      onCloseModal,
    } = this.props

    this.setState({ showLoader: true })

    const selectedCurrencyName = dbCurrencys.find((c) => c.id === selectedCurrency).name

    createService({
      name: introducedName,
      description: introducedDescription,
      pricePerUnit: introducedPricePerUnit,
      unit: introducedUnit,
      currency: selectedCurrencyName
    })
      .then((service) => {
        if (service.error) {
          return this.setState({
            alertShow: true,
            alertType: 'error',
            alertTitle: intl.formatMessage({ id: 'error'}),
            alertMssg: service.error,
            showLoader: false
          })
        } else {
          this.setState({
            introducedName: '',
            introducedDescription: '',
            introducedPricePerUnit: '',
            introducedUnit: '',
            selectedCurrency: 'none',
          })
          onFetchServices & onFetchServices()
        }
        onCloseModal && onCloseModal()
        onSuccess && onSuccess(service)
      })
  }

}

export default injectIntl(NewService);
