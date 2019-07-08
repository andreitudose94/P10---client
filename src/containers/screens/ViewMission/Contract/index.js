import React, {Component} from 'react'
import { FormattedMessage, connect } from 'lib'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import env from '../../../../../env.json'
import Simplert from 'react-simplert'
import moment from 'moment'

import {
  template,
  toolbarTemplate
} from './kendo-templates'

import Grid from 'components/Grid'

import { injectIntl } from 'react-intl'

import styles from './index.scss'


class Contract extends Component {
  constructor(props) {
    super(props)

    this.state = {
      responsible: {},
      alertShow: false,
      alertType: '',
      alertTitle: '',
      alertMssg: '',
      stopErrors: 0,
    }
  }

  componentDidMount() {
//
  }

  render() {
    const {
      contractNumber = '',
      renderedServices = [],
    } = this.props

    return (
      <div className='contract'>
        <h5>Contract</h5>
        <div className='form-field contractForm'>
          <div className='labelContainer'>
            <FormattedMessage id='viewMission.contractNumber' />
            <FontAwesomeIcon className='callRegistrationIcon' icon="file-contract" />
          </div>
          <div className={'contractNumberValue'}>{contractNumber}</div>

          <div className='labelContainer'>
            <FormattedMessage id='services' />
          </div>
          <Grid
            gridId={'servicesGrid'}
            columns={
              [{
                field: "name",
                headerAttributes: {
                  "class": "services-grid-thead-cell",
                  style: "text-align: center; font-size: 14px; width: calc(2/12 * 100%)"
                },
                title: 'Name'
              },{
                field: "description",
                headerAttributes: {
                  "class": "services-grid-thead-cell",
                  style: "text-align: center; font-size: 14px; width: calc(2/12 * 100%)"
                },
                title: 'Description'
              }, {
                field: "startDateTime",
                headerAttributes: {
                  "class": "services-grid-thead-cell",
                  style: "text-align: center; font-size: 14px; width: calc(2/12 * 100%)"
                },
                title: 'Start Date Time'
              }, {
                field: "duration",
                headerAttributes: {
                  "class": "services-grid-thead-cell",
                  style: "text-align: center; font-size: 14px; width: calc(2/12 * 100%)"
                },
                title: 'Duration (min)'
              }, {
                field: "totalPrice",
                headerAttributes: {
                  "class": "services-grid-thead-cell",
                  style: "text-align: center; font-size: 14px; width: calc(1/12 * 100%)"
                },
                title: 'Total Price'
              }, {
                field: "currency",
                headerAttributes: {
                  "class": "services-grid-thead-cell",
                  style: "text-align: center; font-size: 14px; width: calc(1/12 * 100%)"
                },
                title: 'Currency'
              }, {
                field: 'extraService',
                headerAttributes: {
                  "class": "services-grid-thead-cell",
                  style: "text-align: center; font-size: 14px; width: calc(2/12 * 100%)"
                },
                title: 'On contract'
              }]
            }
            dataSource={renderedServices}
            rowTemplate={template}
            visibleHeader={true}
            pageable={{
              pageSize: 10
            }}
          />
        </div>

      </div>
    )
  }

}

export default injectIntl(Contract);
