import React, {Component} from 'react'
import { FormattedMessage, connect } from 'lib'
import socketIOClient from "socket.io-client";
import { Map, GoogleApiWrapper, Marker, InfoWindow } from 'google-maps-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import env from '../../../../../env.json'
import Simplert from 'react-simplert'
import moment from 'moment'

import MapWithADirectionsRenderer from 'components/MapDirections'

import { getResponsible } from 'actions/responsibles'

import { injectIntl } from 'react-intl'

import styles from './index.scss'

const mapStyles = {
  width: '100%',
  height: '100%',
  position: 'relativ'
};

const mapStateToProps = (state) => ({
  responsibleId: state.responsibleId,
})

let socket;

class MapContainer extends Component {
  constructor(props) {
    super(props)

    this.state = {
      responsible: {},
      alertShow: false,
      alertType: '',
      alertTitle: '',
      alertMssg: '',
      stopErrors: 0,
    }
  }

  componentDidMount() {
    const { resp_id = '', responsibleId, intl = {} } = this.props
    const { responsible = {}, stopErrors } = this.state

    //*******
    socket = socketIOClient('http://localhost:8000/');

    const data = {
      responsibleId: responsibleId
    }

    socket.emit('responsible_data', data)
    socket.on("get_responsible", (responsibleNewData) => {
      if(!this.state.responsible.geolocation) {
        return this.setState({responsible: responsibleNewData})
      } else if(
        this.state.responsible.geolocation.lat !== responsibleNewData.geolocation.lat ||
        this.state.responsible.geolocation.lng !== responsibleNewData.geolocation.lng
      ) {
        return this.setState({responsible: responsibleNewData})
      }

    });
    //***********************

    // if (!responsible.responsibleId && resp_id !== ''){
    //   getResponsible(resp_id.trim())
    //     .then((res) => {
    //       if(res.error) {
    //         return this.setState({
    //           alertShow: true,
    //           alertType: 'error',
    //           alertTitle: intl.formatMessage({id: 'error'}),
    //           alertMssg: res.error,
    //           stopErrors: stopErrors + 1,
    //         })
    //       } else {
    //         this.setState({responsible: res})
    //       }
    //     })
    // }
  }

  shouldComponentUpdate(nextProps, nextState) {
    if(nextState.stopErrors === 3) {
      return false
    }
    return true
  }

  componentWillUnmount() {
    socket.disconnect();
  }

  componentDidUpdate(prevProps, prevState) {
    const { resp_id = '', intl, responsibleId } = this.props
    const { responsible = {}, stopErrors } = this.state
    if (!responsible.responsibleId && resp_id !== ''){
      getResponsible(responsibleId)
        .then((res) => {
          if(res.error) {
            return this.setState({
              alertShow: true,
              alertType: 'error',
              alertTitle: intl.formatMessage({id: 'error'}),
              alertMssg: res.error,
              stopErrors: stopErrors + 1,
            })
          } else {
            this.setState({responsible: res})
          }
        })

    }
  }


  // pinSymbol(color) {
  //     return {
  //         path: 'M 0,0 C -2,-20 -10,-22 -10,-30 A 10,10 0 1,1 10,-30 C 10,-22 2,-20 0,0 z M -2,-30 a 2,2 0 1,1 4,0 2,2 0 1,1 -4,0',
  //         fillColor: color,
  //         fillOpacity: 1,
  //         strokeColor: '#000',
  //         strokeWeight: 2,
  //         scale: 1
  //    };
  // }

  getDateTimeFormat(lastSentInfoTime) {
    if(!lastSentInfoTime) return "";
    return moment(lastSentInfoTime).format('MMMM Do YYYY, hh:mm')
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
        <MapWithADirectionsRenderer
          eventAddressGeolocation={eventAddressGeolocation}
          responsibleGeolocation={responsible.geolocation}
        />
        {/*<Map
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

        </Map>*/}
        <div id="right-panel-bottom">
          <table>
            <tbody>
              <tr>
                <td>
                  <FormattedMessage id='viewMissionMap.responsibleIcon' />
                </td>
                <td className="maps_panel_value">
                  A
                  {/*<FontAwesomeIcon className="iconRedFont" icon='map-marker-alt' />*/}
                </td>
              </tr>
              <tr>
                <td>
                  <FormattedMessage id='viewMissionMap.caseIcon' />
                </td>
                <td className="maps_panel_value">
                  B
                  {/*<FontAwesomeIcon className='iconBlueFont' icon='map-marker-alt' />*/}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

      </div>
    )
  }

}

export default injectIntl(connect(mapStateToProps)(MapContainer));
