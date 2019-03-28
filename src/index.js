import React from 'react';
import ReactDOM from 'react-dom';

// add render routes function
import RenderRoutes from 	'./routes/routes.js';

import { Provider } from 'react-redux'
import store from './scripts/store.js'

import styles from './style/index.scss'

ReactDOM.render(
  <Provider store={store}>
    <RenderRoutes />
  </Provider>,
  document.getElementById('app')
);
