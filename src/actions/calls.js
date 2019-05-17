import request from 'superagent'
import { getToken } from 'selectors/user'
import { automaticallyLogoutIfUserDoesntExist } from './user'
import env from '../../env.json'

export const createCall = (newCall) => {
  const token = 'Token ' + getToken()

  return request
    .post(env.REST_URL + '/api/calls/new')
    .send(
      {
        "newCall": newCall
      }
    )
    .set('accept', 'json')
    .set('authorization', token)
    .then(res => res)
    .catch(err => {
      automaticallyLogoutIfUserDoesntExist(err.response.body ? err.response.body.message : err)
      return {error: err.response.body ? err.response.body.message : err}
    })
}

export const getCalls = () => {
  const token = 'Token ' + getToken()

  return request
    .get(env.REST_URL + '/api/calls/all')
    .set('accept', 'json')
    .set('authorization', token)
    .then(res => res.body.calls)
    .catch(err => {
      automaticallyLogoutIfUserDoesntExist(err.response.body ? err.response.body.message : err)
      return {error: err.response.body ? err.response.body.message : err}
    })
}

export const getFilteredCalls = (filters) => {
  const token = 'Token ' + getToken()

  return request
    .post(env.REST_URL + '/api/calls/all-filtered')
    .send(
      {
        "filters": filters
      }
    )
    .set('accept', 'json')
    .set('authorization', token)
    .then(res => res.body.calls)
    .catch(err => {
      automaticallyLogoutIfUserDoesntExist(err.response.body ? err.response.body.message : err)
      return {error: err.response.body ? err.response.body.message : err}
    })
}
