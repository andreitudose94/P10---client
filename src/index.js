import React from 'react';
import ReactDOM from 'react-dom';
import { ConnectedIntlProvider } from 'lib'

// TODO use standard Intl provider
import { addLocaleData } from 'react-intl'
import { IntlProvider, FormattedMessage } from 'react-intl';
import ReactIntlLocaleData from 'react-intl/locale-data'
import roLocaleData from 'react-intl/locale-data/ro';
import moment from 'moment'

import translations from 'lib/translations'

// add render routes function
import RenderRoutes from 	'routes/routes.js';

import { Provider } from 'react-redux'
import store from 'scripts/store.js'

import kendoStyles from 'style/kendo-custom-theme.scss'
import styles from './style/index.scss'

import * as OfflinePluginRuntime from 'offline-plugin/runtime';
OfflinePluginRuntime.install();

import initializeFontAwesomeIcons from 'scripts/icons.js'
initializeFontAwesomeIcons()

// setup locale
// check for index.html for available languages
addLocaleData(roLocaleData)

ReactDOM.render(
  <Provider store={store}>
    <ConnectedIntlProvider>
      <RenderRoutes />
    </ConnectedIntlProvider>
  </Provider>,
  document.getElementById('app')
);
