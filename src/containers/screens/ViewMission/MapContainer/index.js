import React, {Component} from 'react'
import { FormattedMessage, connect } from 'lib'
import { Map, GoogleApiWrapper, Marker, InfoWindow } from 'google-maps-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import env from '../../../../../env.json'
import Simplert from 'react-simplert'

import { getResponsible } from 'actions/responsibles'

import { injectIntl } from 'react-intl'

import styles from './index.scss'

const mapStyles = {
  width: '100%',
  height: '100%',
  position: 'relativ'
};

class MapContainer extends Component {
  constructor(props) {
    super(props)

    this.state = {
      responsible: {},
      alertShow: false,
      alertType: '',
      alertTitle: '',
      alertMssg: ''
    }
  }

  componentDidMount() {
    const { resp_id = '', intl = {} } = this.props
    const { responsible = {} } = this.state

    if (!responsible.responsibleId && resp_id !== ''){
      getResponsible(resp_id.trim())
        .then((res) => {
          if(res.error) {
            return this.setState({
              alertShow: true,
              alertType: 'error',
              alertTitle: intl.formatMessage({id: 'error'}),
              alertMssg: res.error,
            })
            // return alert(res.Error)
          } else {
            this.setState({responsible: res})
          }
        })
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { resp_id = '' } = this.props
    const { responsible = {} } = this.state

    if (!responsible.responsibleId){
      getResponsible(resp_id.trim())
        .then((res) => {
          if(res.error) {
            return this.setState({
              alertShow: true,
              alertType: 'error',
              alertTitle: intl.formatMessage({id: 'error'}),
              alertMssg: res.error,
            })
            // return alert(res.error)
          } else {
            this.setState({responsible: res})
          }
        })

    }
  }


  pinSymbol(color) {
      return {
          path: 'M 0,0 C -2,-20 -10,-22 -10,-30 A 10,10 0 1,1 10,-30 C 10,-22 2,-20 0,0 z M -2,-30 a 2,2 0 1,1 4,0 2,2 0 1,1 -4,0',
          fillColor: color,
          fillOpacity: 1,
          strokeColor: '#000',
          strokeWeight: 2,
          scale: 1
     };
  }

  getDateTimeFormat(lastSentInfoTime) {
    if(!lastSentInfoTime) return "";
    return moment(lastSentInfoTime).format('MMMM Do YYYY, h:mm:ss a')
  }

  render() {
    const {
      intl,
      google,
      eventAddressGeolocation = {},
    } = this.props
    const {
      responsible = {},
      alertShow = false,
      alertType = 'info',
      alertTitle = 'Title',
      alertMssg = 'No message'
    } = this.state

    const {
      lastSentInfoTime = '',
      name = '',
      responsibleId = '',
      status = '',
      online = '',
    } = responsible

    return (
      <div className='containerMap2'>

      <Simplert
        showSimplert={alertShow}
        type={alertType}
        title={alertTitle}
        message={alertMssg}
        onClose={() => this.setState({alertShow: false})}
      />

        <div id="right-panel-top">
          <table>
            <tbody>
              <tr>
                <td>
                  <FormattedMessage id='viewMissionMap.received' />
                </td>
                <td className="maps_panel_value">
                  {this.getDateTimeFormat(lastSentInfoTime)}
                </td>
              </tr>
              <tr>
                <td>
                  <FormattedMessage id='viewMissionMap.name' />
                </td>
                <td className="maps_panel_value">
                  {name}
                </td>
              </tr>
              <tr>
                <td>
                  <FormattedMessage id='viewMissionMap.id' />
                </td>
                <td className="maps_panel_value">
                  {responsibleId}
                </td>
              </tr>
              <tr>
                <td>
                  <FormattedMessage id='viewMissionMap.status' />
                </td>
                <td className="maps_panel_value">
                  {status}
                </td>
              </tr>
              <tr>
                <td>
                  <FormattedMessage id='viewMissionMap.online' />
                </td>
                <td className="maps_panel_value">
                  {online ? 'true' : 'false'}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <Map
          google={google}
          zoom={10}
          style={mapStyles}
          initialCenter={{ lat: 44.9595157, lng: 24.9484054 }}
          disableDefaultUI={true}
        >
          <Marker
            key={'event'}
            icon={this.pinSymbol('#2196f3')}
            position={{ lat: eventAddressGeolocation.lat, lng: eventAddressGeolocation.lng }}
          />
          {
              responsible.geolocation &&
              <Marker
                key={'responsible'}
                icon={this.pinSymbol('#F00')}
                position={{ lat: responsible.geolocation.lat, lng: responsible.geolocation.lng }}
              />
          }

        </Map>
        <div id="right-panel-bottom">
          <table>
            <tbody>
              <tr>
                <td>
                  <FormattedMessage id='viewMissionMap.responsibleIcon' />
                </td>
                <td className="maps_panel_value">
                  <FontAwesomeIcon className="iconRedFont" icon='map-marker-alt' />
                </td>
              </tr>
              <tr>
                <td>
                  <FormattedMessage id='viewMissionMap.caseIcon' />
                </td>
                <td className="maps_panel_value">
                  <FontAwesomeIcon className='iconBlueFont' icon='map-marker-alt' />
                </td>
              </tr>
            </tbody>
          </table>
        </div>

      </div>
    )
  }

}

export default injectIntl(GoogleApiWrapper({
  apiKey: env.APY_KEY
})(MapContainer));
