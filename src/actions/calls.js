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
      alert(err.response.body.message)
      return automaticallyLogoutIfUserDoesntExist(err.response.body.message)
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
      alert(err.response.body.message)
      return automaticallyLogoutIfUserDoesntExist(err.response.body.message)
    })
}
