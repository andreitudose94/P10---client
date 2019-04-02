import {
  SET_CURRENT_USER_CREDENTIALS,
  LOGOUT,
  RESET_STATE
} from '../constants/actions-type.js'
import translations from '../lib/translations.js'

export const setCurrentUserCredentials = (credentials) => dispatch(SET_CURRENT_USER_CREDENTIALS, credentials)

export const logout = () => {
  const state = localStorage.getItem('state')
  localStorage.clear('state');
  const serializedState = JSON.parse(state)
  console.log('serializedState',serializedState);
  return dispatch(RESET_STATE, initState(serializedState))
}

const initState = (state) => ({
  intl: translations[state.intl.locale || 'en']
})
