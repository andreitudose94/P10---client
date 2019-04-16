import request from 'superagent'
import { getToken } from 'selectors/user'
import { automaticallyLogoutIfUserDoesntExist } from './user'
import env from '../../env.json'

export const getResponsibles = () => {
  const token = 'Token ' + getToken()

  return request
    .get(env.REST_URL + '/api/responsibles/all')
    .set('accept', 'json')
    .set('authorization', token)
    .then(res => res.body.responsibles)
    .catch(err => {
      alert(err.response.body.message)
      return automaticallyLogoutIfUserDoesntExist(err.response.body.message)
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
      alert(err.response.body.message)
      return automaticallyLogoutIfUserDoesntExist(err.response.body.message)
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
      alert(err.response.body.message)
      return automaticallyLogoutIfUserDoesntExist(err.response.body.message)
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
      const errMessage = err.response.body.message
      alert(errMessage)
      if(errMessage === 'Your account doesn\'t exist anymore!') {
        return automaticallyLogoutIfUserDoesntExist(err.response.body.message)
      } else if(errMessage === 'This responsible has been reserved already!') {
        return 'Responsible already reserved';
      }
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
      alert(err.response.body.message)
      return automaticallyLogoutIfUserDoesntExist(err.response.body.message)
    })
}

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
