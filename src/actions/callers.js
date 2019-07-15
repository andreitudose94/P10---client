import request from 'superagent'
import { getToken } from 'selectors/user'
import { automaticallyLogoutIfUserDoesntExist } from './user'
import env from '../../env.json'

export const createCaller = (caller) => {
  const token = 'Token ' + getToken()

  return request
    .post(env.REST_URL + '/api/callers/new')
    .send(
      {
        "caller": caller
      }
    )
    .set('accept', 'json')
    .set('authorization', token)
    .then(res => res.body.caller)
    .catch(err => {
      automaticallyLogoutIfUserDoesntExist(err.response.body ? err.response.body.message : err)
      return {error: err.response.body ? err.response.body.message : err}
    })
}

export const getCallers = () => {
  const token = 'Token ' + getToken()

  return request
    .get(env.REST_URL + '/api/callers/all')
    .set('accept', 'json')
    .set('authorization', token)
    .then(res => res.body.callers)
    .catch(err => {
      automaticallyLogoutIfUserDoesntExist(err.response.body ? err.response.body.message : err)
      return {error: err.response.body ? err.response.body.message : err}
    })
}
