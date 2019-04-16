import request from 'superagent'
import {
  googleAPIsServer
} from 'constants/googleAPIs'
import env from '../../env.json'

export const getDistances = (origins, destinations) => {

  const proxyurl = "https://cors-anywhere.herokuapp.com/";

  return request
    .get(proxyurl + googleAPIsServer + 'distancematrix/json?' +
         'origins=' + origins +
         '&destinations=' + destinations +
         '&key=' + env.APY_KEY)
    .set('accept', 'json')
    .then(res => res.body)
    .catch(err => alert(err))
}
