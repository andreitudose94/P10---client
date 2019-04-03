import {
  SET_CURRENT_USER_CREDENTIALS,
  SET_CURRENT_USER_TENANTS,
  SET_CURRENT_USER_ACTIVE_TENANT,
  LOGOUT
} from '../constants/actions-type.js'

const user = (state = {}, action) => {
  switch (action.type) {
    case SET_CURRENT_USER_CREDENTIALS:
      return action.payload
    case SET_CURRENT_USER_TENANTS:
      return {
        ...state,
        tenantsList: action.payload
      }
    case SET_CURRENT_USER_ACTIVE_TENANT:
    return {
      ...state,
      activeTenant: action.payload
    }
    case LOGOUT:
      return {}
    default:
      return state
  }
}

export default user
