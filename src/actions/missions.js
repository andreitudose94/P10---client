import request from 'superagent'
import { getToken } from 'selectors/user'
import { automaticallyLogoutIfUserDoesntExist } from './user'
import env from '../../env.json'

export const getMissionsForSpecifiedCall = (callIndex) => {
  const token = 'Token ' + getToken()

  return request
    .post(env.REST_URL + '/api/missions/view')
    .send(
      {
        "callIndex": callIndex
      }
    )
    .set('accept', 'json')
    .set('authorization', token)
    .then(res => res.body.mission)
    .catch(err => {
      console.log('err', err);
      automaticallyLogoutIfUserDoesntExist(err.response.body ? err.response.body.message : err)
      return {error: err.response.body ? err.response.body.message : err}
    })
}
