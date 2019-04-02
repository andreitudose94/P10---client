import { combineReducers } from 'redux'
import { intlReducer as intl } from 'react-intl-redux'

import { RESET_STATE } from '../constants/actions-type.js'

import user from './user'

const appReducer = combineReducers({
  user,
  intl
})

export default (state, action) => {

  if(action.type === RESET_STATE) {
    state = action.payload
  }

  return appReducer(state, action)
}
