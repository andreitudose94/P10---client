import React from 'react';
import ReactDOM from 'react-dom';

// add render routes function
import RenderRoutes from 	'./routes/routes.js';

import { Provider } from 'react-redux'
import store from './scripts/store.js'

import styles from './style/index.scss'

// if('serviceWorker' in navigator) {
//   console.log('Service Worked Supported!');
//   navigator.serviceWorker
//     .register('service_worker.js')
//     .then(reg => console.log('Service Worker: Registered'))
//     .catch(err => console.log(`Service Worker: Error: ${err}`))
// }

import * as OfflinePluginRuntime from 'offline-plugin/runtime';
OfflinePluginRuntime.install();

ReactDOM.render(
  <Provider store={store}>
    <RenderRoutes />
  </Provider>,
  document.getElementById('app')
);
