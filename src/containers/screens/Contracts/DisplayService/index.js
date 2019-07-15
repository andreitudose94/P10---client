import React, {Component} from 'react'
import { FormattedMessage, connect } from 'lib'
import { injectIntl } from 'react-intl'
import moment from 'moment'
import { Redirect } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Simplert from 'react-simplert'

import Textbox from 'components/Textbox'
import Button from 'components/Button'

import styles from './index.scss'

class DisplayService extends Component {

  constructor(props) {
    super(props)

  }

  render() {

    const {
      intl = {},
      serviceSelected,
      onClose,
    } = this.props

    return (
      <div className='display-service'>
        <div className='form-field'>
          <div className='labelContainer'>
            <FormattedMessage id='name' />
          </div>
          <Textbox
            name={'service-name'}
            value={serviceSelected.name}
            extraClassName='textField'
            readOnly={true}
            placeholder={'Type to introduce the service\'s name'}
            onChange={(value, name) => this.setState({introducedName: value})}
          />
        </div>

        <div className='form-field'>
          <div className='labelContainer'>
            <FormattedMessage id='description' />
          </div>
          <textarea
            type="text"
            value={serviceSelected.description}
            readOnly
          />

        </div>

        <div className='form-field'>
          <div className='labelContainer'>
            <FormattedMessage id='pricePerUnit' />
          </div>
          <Textbox
            name={'service-pricePerUnit'}
            value={serviceSelected.pricePerUnit}
            extraClassName='textField'
            readOnly={true}
            placeholder={'Type to introduce the ssn'}
            onChange={(value, name) => this.setState({introducedPricePerUnit: value})}
          />
        </div>

        <div className='form-field'>
          <div className='labelContainer'>
            <FormattedMessage id='unit' />
          </div>
          <Textbox
            name={'service-Unit'}
            value={serviceSelected.unit}
            extraClassName='textField'
            readOnly={true}
            placeholder={'Type to introduce the type of unit'}
            onChange={(value, name) => this.setState({introducedUnit: value})}
          />
        </div>

        <div className='form-field'>
          <div className='labelContainer'>
            <FormattedMessage id='currency' />
          </div>
          <Textbox
            name={'service-currency'}
            value={serviceSelected.currency}
            extraClassName='textField'
            readOnly={true}
            placeholder={'Type to introduce the type of unit'}
            onChange={(value, name) => this.setState({introducedUnit: value})}
          />
        </div>

        <center>
          <Button
            name={'ok'}
            enable={true}
            icon={'check'}
            primary={true}
            extraClassName={'form-button'}
            onClick={(name) => onClose()}
          >
            <FormattedMessage id='ok' />
          </Button>
        </center>
      </div>
    )
  }


}

export default injectIntl(DisplayService);
