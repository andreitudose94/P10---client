import {
  SET_CURRENT_USER_CREDENTIALS,
  SET_CURRENT_USER_TENANTS,
  SET_CURRENT_USER_ACTIVE_TENANT,
  LOGOUT,
  RESET_STATE
} from 'constants/actions-type.js'

import env from '../../env.json'

import request from 'superagent'
import translations from 'lib/translations.js'

import { getToken, getTenantsList } from 'selectors/user'

export const setCurrentUserCredentials = (credentials) => dispatch(SET_CURRENT_USER_CREDENTIALS, credentials)

export const setCurrentUserTenants = (tenantsList) => dispatch(SET_CURRENT_USER_TENANTS, tenantsList)

export const setActiveTenant = (activeTenant) => dispatch(SET_CURRENT_USER_ACTIVE_TENANT, activeTenant)

export const automaticallyLogoutIfUserDoesntExist = (errMsg) => {
  if(errMsg === "Your account doesn't exist anymore!") {
    return logout()
  }
}

export const login = (email, password) =>
  request
    .post(env.REST_URL + '/api/users/login')
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
    .catch(err => {
      return {error: err}
    })

export const getUsers = () => {
  const token = 'Token ' + getToken()

  return request
    .get(env.REST_URL + '/api/users/all')
    .set('accept', 'json')
    .set('authorization', token)
    .then(res => res.body.users)
    .catch(err => {
      automaticallyLogoutIfUserDoesntExist(err.response.body.message)
      return {error: err}
    })
}

export const createUser = (user) => {
  const token = 'Token ' + getToken()

  return request
    .post(env.REST_URL + '/api/users/new')
    .send(
      {
        "user": user
      }
    )
    .set('accept', 'json')
    .set('authorization', token)
    .then(res => res)
    .catch(err => {
      automaticallyLogoutIfUserDoesntExist(err.response.body.message)
      return {error: err}
    })
}

export const changeUserDefaultPassword = (newPassword) => {

  return request
    .post(env.REST_URL + '/api/users/reset-default-password')
    .send(
      {
        "password": newPassword
      }
    )
    .set('accept', 'json')
    .then(res => res)
    .catch(err => { return {error: err} })
}

export const createTenant = (tenant) => {
  const token = 'Token ' + getToken()
  const tenantsList = getTenantsList()

  return request
    .post(env.REST_URL + '/api/users/addTenant')
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
    .catch(err => {
      automaticallyLogoutIfUserDoesntExist(err.response.body.message)
      return {error: err}
    })
}

export const activateTenant = (tenant) => {
  const token = 'Token ' + getToken()

  return request
    .post(env.REST_URL + '/api/users/activateTenant')
    .send(
      {
        "activeTenant": tenant
      }
    )
    .set('accept', 'json')
    .set('authorization', token)
    .then(res => res.body.activeTenant)
    .catch(err => {
      automaticallyLogoutIfUserDoesntExist(err.response.body.message)
      return {error: err}
    })
}

export const deleteTenant = (tenant) => {
  const token = 'Token ' + getToken()
  const tenantsList = getTenantsList()
  const newTenantsList = tenantsList.filter((t) => t.title !== tenant.title)
  return request
    .post(env.REST_URL + '/api/users/deleteTenant')
    .send(
      {
        "tenantsList": newTenantsList,
        "tenantDeleted": tenant.title
      }
    )
    .set('accept', 'json')
    .set('authorization', token)
    .then(res => setCurrentUserTenants(res.body.tenantsList))
    .catch(err => {
      automaticallyLogoutIfUserDoesntExist(err.response.body.message)
      return {error: err}
    })
}
export const logout = () => {
  const state = localStorage.getItem('state')
  localStorage.clear('state');
  const serializedState = JSON.parse(state)
  return dispatch(RESET_STATE, initState(serializedState))
}

export const changePassword = (oldPassword, newPassword) => {
  const token = 'Token ' + getToken()
  return request
    .post(env.REST_URL + '/api/users/changePassword')
    .send({
      "oldPassword": oldPassword,
      "newPassword": newPassword
    })
    .set('accept', 'json')
    .set('authorization', token)
    .then((res) => res)
    .catch(err => {
      automaticallyLogoutIfUserDoesntExist(err.response.body.message)
      return {error: err}
    })
}

const initState = (state) => ({
  intl: translations[state.intl.locale || 'en']
})
