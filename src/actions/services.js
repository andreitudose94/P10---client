import request from 'superagent'
import { getToken } from 'selectors/user'
import { automaticallyLogoutIfUserDoesntExist } from './user'
import env from '../../env.json'

export const createService = (service) => {
  const token = 'Token ' + getToken()

  return request
    .post(env.REST_URL + '/api/services/new')
    .send(
      {
        "service": service
      }
    )
    .set('accept', 'json')
    .set('authorization', token)
    .then(res => {
      return res.body
    })
    .catch(err => {
      automaticallyLogoutIfUserDoesntExist(err.response.body ? err.response.body.message : err)
      return {error: err.response.body ? err.response.body.message : err}
    })
}

export const getServices = () => {
  const token = 'Token ' + getToken()

  return request
    .get(env.REST_URL + '/api/services/view')
    .set('accept', 'json')
    .set('authorization', token)
    .then(res => res.body.services)
    .catch(err => {
      automaticallyLogoutIfUserDoesntExist(err.response.body ? err.response.body.message : err)
      return {error: err.response.body ? err.response.body.message : err}
    })
}
