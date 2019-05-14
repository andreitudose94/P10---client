import request from 'superagent'
import { getToken } from 'selectors/user'
import { automaticallyLogoutIfUserDoesntExist } from './user'
import env from '../../env.json'

export const createMessage = (newMessage) => {
  const token = 'Token ' + getToken()

  return request
    .post(env.REST_URL + '/api/messages/new')
    .send(
      {
        "newMessage": newMessage
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

export const getMessages = (callIndex) => {
  const token = 'Token ' + getToken()

  return request
    .post(env.REST_URL + '/api/messages/view')
    .send(
      {
        "callIndex": callIndex
      }
    )
    .set('accept', 'json')
    .set('authorization', token)
    .then(res => res.body.messages)
    .catch(err => {
      automaticallyLogoutIfUserDoesntExist(err.response.body.message)
      return {error: err}
    })
}

export const updateMessages = (data) => {
  const token = 'Token ' + getToken()

  return request
    .post(env.REST_URL + '/api/messages/update')
    .send(
      {
        callIndex: data.callIndex,
        primaryTenant: data.primaryTenant,
        activeTenant: data.activeTenant
      }
    )
    .set('accept', 'json')
    .set('authorization', token)
    .then(res => res.body.messages)
    .catch(err => {
      automaticallyLogoutIfUserDoesntExist(err.response.body.message)
      return {error: err}
    })
}
