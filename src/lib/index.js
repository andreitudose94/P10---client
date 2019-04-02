/**
 * Created by Florin David on 11/10/2016.
 */
import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {
  FormattedMessage as IntlFormattedMessage,
  FormattedDate,
  FormattedNumber,
  FormattedRelative,
  FormattedPlural
} from 'react-intl'
import { IntlProvider } from 'react-intl-redux'

/* eslint react/prop-types: 0 */
/**
 * HOC FormattedMessage
 *   - add `????` if missing id
 *
 * @param {String} id
 * @param {...Object} rest
 *
 * @constructor
 */
const FormattedMessage = ({id, ...rest}) => {
  return (<IntlFormattedMessage id={id || '????'} {...rest} />)
}

/**
 * Connected Intl Provider
 *
 * @param  {Object} state
 * @constructor
 */
const ConnectedIntlProvider = connect((state) => ({
    locale: state.intl.locale,
    messages: state.intl.messages,
    key: state.intl.locale,
})
)(IntlProvider)

export {
  React,
  PropTypes,
  connect,
  FormattedMessage,
  FormattedDate,
  FormattedNumber,
  FormattedRelative,
  FormattedPlural,
  ConnectedIntlProvider
};

export default React;
