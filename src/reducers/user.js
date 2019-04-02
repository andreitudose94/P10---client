import {
  SET_CURRENT_USER_CREDENTIALS,
  LOGOUT
} from '../constants/actions-type.js'

const user = (state = {}, action) => {
  switch (action.type) {
    case SET_CURRENT_USER_CREDENTIALS:
      return action.payload
    case LOGOUT:
      return {}
    default:
      return state
  }
}

export default user
