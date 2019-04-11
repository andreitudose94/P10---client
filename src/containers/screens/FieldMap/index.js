import React, {Component} from 'react'
import { FormattedMessage, connect } from 'lib'
import { Map, GoogleApiWrapper, Marker, InfoWindow } from 'google-maps-react';
import env from '../../../../env.json'
import { injectIntl } from 'react-intl'

import DropdownList from 'components/DropdownList'
import styles from './index.scss'
import { lang } from 'selectors/user'
import { setLocale } from 'actions/intl'

const mapStyles = {
  width: '100%',
  height: '100%'
};

const responsibles = [
  {
    Name: 'Razvan',
    SentTime: '2018-06-01 9:26:02',
    Status: 'Availabe',
    Online: true,
    Geolocation: {
      lat: 44.853541,
      lng:24.8418612
    }
  },
  {
    Name: 'Tudy',
    SentTime: '2018-06-01 9:26:02',
    Status: 'Availabe',
    Online: true,
    Geolocation: {
      lat: 44.353555,
      lng:24.4818655
    }
  },
  {
    Name: 'Seby',
    SentTime: '2018-06-01 9:26:02',
    Status: 'Availabe',
    Online: false,
    Geolocation: {
      lat: 44.453555,
      lng:24.8318633
    }
  },
  {
    Name: 'Dany',
    SentTime: '2018-06-01 9:26:02',
    Status: 'Availabe',
    Online: false,
    Geolocation: {
      lat: 44.857541,
      lng:24.1818655
    }
  }
]

class FieldMap extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showingInfoWindow: false,  //Hides or the shows the infoWindow
      activeMarker: {},          //Shows the active marker upon click
      selectedPlace: {},         //Shows the infoWindow to the selected place upon a marker
      markerObjects: [],
      mapCenter: { lat: 44.853541, lng: 24.8818612 }
    }

    this.onMarkerClick = this.onMarkerClick.bind(this)
    this.onClose = this.onClose.bind(this)
    this.onMarkerMounted = this.onMarkerMounted.bind(this)
  }

  onMarkerMounted(element) {
      this.setState(prevState => ({
        markerObjects: [...prevState.markerObjects, element]
      }))
    };

  onMarkerClick(props, marker) {
    const { data } = props
    const { markerObjects } = this.state

    this.setState({
      responsibleData: data,
      activeMarker: marker,
      showingInfoWindow: true,
      mapCenter: {...data.Geolocation},
    });
  }

  onClose(props) {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  };

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

  render() {
    const { intl } = this.props
    const {
      responsibleData = {},
      activeMarker,
      showingInfoWindow,
      mapCenter
    } = this.state

    const responsible = intl.formatMessage({id: 'marker.responsible'}) + responsibleData.Name
    const sentTime = intl.formatMessage({id: 'marker.sentTime'}) + responsibleData.SentTime
    const status = intl.formatMessage({id: 'marker.status'}) + responsibleData.Status
    const online = intl.formatMessage({id: 'marker.online'}) + responsibleData.Online

    return (
      <div className='fieldMap'>
        <div className="responsibles_positions_map_title">
          <FormattedMessage id='respOnMap' />
          <div className='form-field listResponsibles'>
            <DropdownList
              name={'caller'}
              dataSource={responsibles}
              value={'1'}
              dataTextField={'Name'}
              dataValueField={'Name'}
              onChange={(val, name) => this.handleSelectResponsible(val)}
              extraClassName='form-dropdown'
            />
          </div>
        </div>
        <Map
          google={this.props.google}
          zoom={8}
          style={mapStyles}
          initialCenter={{ lat: mapCenter.lat, lng: mapCenter.lng }}
          center={{ lat: mapCenter.lat, lng: mapCenter.lng }}
        >
        {
          responsibles.map((responsible) => {
            return (
              <Marker ref={this.onMarkerMounted}
                key={responsible.Name}
                onClick={this.onMarkerClick}
                data={responsible}
                icon={responsible.Online ? this.pinSymbol('#F00') : this.pinSymbol('#ccc')}
                position={{ lat: responsible.Geolocation.lat, lng: responsible.Geolocation.lng }}
              />
            )
          })
        }

          <InfoWindow
            marker={activeMarker}
            visible={showingInfoWindow}
            onClose={this.onClose}
          >
            <div>
              <div>{responsible}</div>
              <div>{sentTime}</div>
              <div>{status}</div>
              <div>{online}</div>
            </div>
          </InfoWindow>
        </Map>
      </div>
    )
  }

  handleSelectResponsible(name) {
    const { markerObjects } = this.state
    let responsible = {data: {}}
    responsible.data = {...responsibles.find((res) => res.Name === name)}
    let findMarker = markerObjects.find((mk) => {
      return mk.marker.data.Name === name
    })

    this.onMarkerClick(responsible, findMarker.marker)
  }
}

export default injectIntl(GoogleApiWrapper({
  apiKey: env.APY_KEY
})(FieldMap));
