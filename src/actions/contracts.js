import request from 'superagent'
import { getToken } from 'selectors/user'
import { automaticallyLogoutIfUserDoesntExist } from './user'
import env from '../../env.json'

export const createContract = (contract) => {
  const token = 'Token ' + getToken()

  return request
    .post(env.REST_URL + '/api/contracts/new')
    .send(
      {
        "contract": contract
      }
    )
    .set('accept', 'json')
    .set('authorization', token)
    .then(res => res.body.contract)
    .catch(err => {
      automaticallyLogoutIfUserDoesntExist(err.response.body ? err.response.body.message : err)
      return {error: err.response.body ? err.response.body.message : err}
    })
}

export const getContracts = () => {
  const token = 'Token ' + getToken()

  return request
    .get(env.REST_URL + '/api/contracts/view')
    .set('accept', 'json')
    .set('authorization', token)
    .then(res => res.body.contracts)
    .catch(err => {
      automaticallyLogoutIfUserDoesntExist(err.response.body ? err.response.body.message : err)
      return {error: err.response.body ? err.response.body.message : err}
    })
}
