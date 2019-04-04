import {
  SET_CURRENT_USER_CREDENTIALS,
  SET_CURRENT_USER_TENANTS,
  SET_CURRENT_USER_ACTIVE_TENANT,
  LOGOUT,
  RESET_STATE
} from 'constants/actions-type.js'
import request from 'superagent'
import translations from 'lib/translations.js'

import { getToken, getTenantsList } from 'selectors/user'

export const setCurrentUserCredentials = (credentials) => dispatch(SET_CURRENT_USER_CREDENTIALS, credentials)

export const setCurrentUserTenants = (tenantsList) => dispatch(SET_CURRENT_USER_TENANTS, tenantsList)

export const setActiveTenant = (activeTenant) => dispatch(SET_CURRENT_USER_ACTIVE_TENANT, activeTenant)

export const login = (email, password) =>
  request
    .post('http://localhost:8000/api/users/login')
    .send(
      {
        user: {
          email,
          password
        }
      }
    )
    .set('accept', 'json')
    .then(res => setCurrentUserCredentials(res.body.user))
    .catch(err => alert(err.response.body.message))

export const createTenant = (tenant) => {
    const token = 'Token ' + getToken()
    const tenantsList = getTenantsList()

    return request
      .post('http://localhost:8000/api/users/addTenant')
      .send(
        {
          "tenantsList": [
            ...tenantsList,
            tenant
          ]
        }
      )
      .set('accept', 'json')
      .set('authorization', token)
      .then(res => setCurrentUserTenants(res.body.tenantsList))
      .catch(err => alert(err.response.body.message))
  }

export const deleteTenant = (tenant) => {
  const token = 'Token ' + getToken()
  const tenantsList = getTenantsList()
  const newTenantsList = tenantsList.filter((t) => t.title !== tenant.title)
  return request
    .post('http://localhost:8000/api/users/deleteTenant')
    .send(
      {
        "tenantsList": newTenantsList
      }
    )
    .set('accept', 'json')
    .set('authorization', token)
    .then(res => setCurrentUserTenants(res.body.tenantsList))
    .catch(err => alert(err.response.body.message))
}
export const logout = () => {
  const state = localStorage.getItem('state')
  localStorage.clear('state');
  const serializedState = JSON.parse(state)
  return dispatch(RESET_STATE, initState(serializedState))
}

const initState = (state) => ({
  intl: translations[state.intl.locale || 'en']
})
