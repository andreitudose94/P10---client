import request from 'superagent'
import { getToken } from 'selectors/user'
import { automaticallyLogoutIfUserDoesntExist } from './user'
import env from '../../env.json'

export const getCompanies = () => {
  const token = 'Token ' + getToken()

  return request
    .get(env.REST_URL + '/api/companies/all')
    .set('accept', 'json')
    .set('authorization', token)
    .then(res => res.body.companies)
    .catch(err => {
      automaticallyLogoutIfUserDoesntExist(err.response.body ? err.response.body.message : err)
      return {error: err.response.body ? err.response.body.message : err}
    })
}

export const createCompany = (company) => {
  const token = 'Token ' + getToken()

  return request
    .post(env.REST_URL + '/api/companies/new')
    .send(
      {
        "company": company
      }
    )
    .set('accept', 'json')
    .set('authorization', token)
    .then(res => {
      console.log('resresres', res);
      return res})
    .catch(err => {
      console.log(err);
      automaticallyLogoutIfUserDoesntExist(err.response.body ? err.response.body.message : err)
      return {error: err.response.body ? err.response.body.message : err}
    })
}


export const changeCompanyDefaultPassword = (newPassword) => {

  return request
    .post(env.REST_URL + '/api/companies/reset-default-password')
    .send(
      {
        "password": newPassword
      }
    )
    .set('accept', 'json')
    .then(res => res)
    .catch(err => {return { error: err }})
}

export const verifyCompanyPassword = (companyId, password) => {
  const token = 'Token ' + getToken()

  return request
    .post(env.REST_URL + '/api/companies/verify-company-password')
    .send(
      {
        "companyId": companyId,
        "password": password,
      }
    )
    .set('accept', 'json')
    .set('authorization', token)
    .then(res => res.body.validate)
    .catch(err => {
      automaticallyLogoutIfUserDoesntExist(err.response.body ? err.response.body.message : err)
      return {error: err.response.body ? err.response.body.message : err}
    })
}
