import request from 'superagent'
import { getToken } from 'selectors/user'
import { automaticallyLogoutIfUserDoesntExist } from './user'
import { SET_RESPONSIBLES_ID } from 'constants/actions-type'
import env from '../../env.json'

export const getResponsibles = () => {
  const token = 'Token ' + getToken()

  return request
    .get(env.REST_URL + '/api/responsibles/all')
    .set('accept', 'json')
    .set('authorization', token)
    .then(res => res.body.responsibles)
    .catch(err => {
      automaticallyLogoutIfUserDoesntExist(err.response.body.message)
      return {error: err}
    })
}

export const getResponsible = (responsibleId) => {
  const token = 'Token ' + getToken()

  return request
    .post(env.REST_URL + '/api/responsibles/responsible')
    .send({"responsibleId": responsibleId})
    .set('accept', 'json')
    .set('authorization', token)
    // .set('indexId', indexId)
    .then(res => res.body.responsible)
    .catch(err => {
      return {error: err.response.body ? err.response.body.message : err}
    })
}

export const getActiveResponsibles = () => {
  const token = 'Token ' + getToken()

  return request
    .get(env.REST_URL + '/api/responsibles/all-actives')
    .set('accept', 'json')
    .set('authorization', token)
    .then(res => res.body.responsibles)
    .catch(err => {
      automaticallyLogoutIfUserDoesntExist(err.response.body ? err.response.body.message : err)
      return {error: err.response.body ? err.response.body.message : err}
    })
}

export const createResponsible = (responsible) => {
  const token = 'Token ' + getToken()

  return request
    .post(env.REST_URL + '/api/responsibles/new')
    .send(
      {
        "responsible": responsible
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

export const reserveResponsible = (id, callUniqueId) => {
  const token = 'Token ' + getToken()

  return request
    .post(env.REST_URL + '/api/responsibles/reserve-responsible')
    .send(
      {
        "respId": id,
        "uniqueId": callUniqueId
      }
    )
    .set('accept', 'json')
    .set('authorization', token)
    .then(res => res)
    .catch(err => {
      let errMessage = err
      if(errMessage === 'Your account doesn\'t exist anymore!') {
        automaticallyLogoutIfUserDoesntExist(err.response.body ? err.response.body.message : err)
        return {error: err.response.body ? err.response.body.message : err}
      } else if(errMessage === 'This responsible has been reserved already!') {
        errMessage = 'Responsible already reserved';
        return {error: errMessage}
        // return 'Responsible already reserved';
      }
      return {error: errMessage}
    })
}

export const releaseResponsibles = (callUniqueId) => {
  const token = 'Token ' + getToken()

  return request
    .post(env.REST_URL + '/api/responsibles/release')
    .send(
      {
        "uniqueId": callUniqueId
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

export const setResponsibleId = (res_id) => dispatch(SET_RESPONSIBLES_ID, res_id)

// export const changeCompanyDefaultPassword = (newPassword) => {
//
//   return request
//     .post(env.REST_URL + '/api/companies/reset-default-password')
//     .send(
//       {
//         "password": newPassword
//       }
//     )
//     .set('accept', 'json')
//     .then(res => res)
//     .catch(err => alert(err.response.body.message))
// }
//
// export const verifyCompanyPassword = (companyId, password) => {
//   const token = 'Token ' + getToken()
//
//   return request
//     .post(env.REST_URL + '/api/companies/verify-company-password')
//     .send(
//       {
//         "companyId": companyId,
//         "password": password,
//       }
//     )
//     .set('accept', 'json')
//     .set('authorization', token)
//     .then(res => res.body.validate)
//     .catch(err => {
//       alert(err.response.body.message)
//       return automaticallyLogoutIfUserDoesntExist(err.response.body.message)
//     })
// }
