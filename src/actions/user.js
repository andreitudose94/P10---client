import {
  SET_CURRENT_USER_CREDENTIALS
} from '../constants/actions-type.js'

export const setCurrentUserCredentials = (credentials) => dispatch(SET_CURRENT_USER_CREDENTIALS, credentials)
