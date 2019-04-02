import { combineReducers } from 'redux'
import { intlReducer as intl } from 'react-intl-redux'

import user from './user'

const appReducer = combineReducers({
  user,
  intl
})

export default appReducer
