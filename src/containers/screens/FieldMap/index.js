import React, {Component} from 'react'
import { FormattedMessage, connect } from 'lib'
import { Map, GoogleApiWrapper, Marker, InfoWindow } from 'google-maps-react';
import env from '../../../../env.json'
import { injectIntl } from 'react-intl'

import {
  responsible_dd_template,
  responsible_dd_headerTemplate,
} from './kendo-templates'

import DropdownList from 'components/DropdownList'
import styles from './index.scss'

import { lang } from 'selectors/user'

import { setLocale } from 'actions/intl'
import { getResponsibles } from 'actions/responsibles'

const mapStyles = {
  width: '100%',
  height: '100%'
};

class FieldMap extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showingInfoWindow: false,  //Hides or the shows the infoWindow
      activeMarker: {},          //Shows the active marker upon click
      selectedPlace: {},         //Shows the infoWindow to the selected place upon a marker
      markerObjects: [],
      mapCenter: { lat: 44.853541, lng: 24.8818612 },
      zoom: 8,
      dsResponsibles: [],
      responsibles: []
    }

    this.onMarkerClick = this.onMarkerClick.bind(this)
    this.onClose = this.onClose.bind(this)
    this.onMarkerMounted = this.onMarkerMounted.bind(this)
    this.getResponsiblesAndPrelucrateThem = this.getResponsiblesAndPrelucrateThem.bind(this)
  }

  componentDidMount() {
    this.getResponsiblesAndPrelucrateThem()
  }

  getResponsiblesAndPrelucrateThem() {
    return getResponsibles()
      .then((responsibles) => {
        let dataSource = [{id: '', dataView: 'Responsible'}]
        responsibles.forEach((res) => {
          dataSource.push({
            id: res._id,
            dataView: res.name + ' | ' + res.responsibleId
          })
        })
        return this.setState({
          dsResponsibles: dataSource,
          responsibles: responsibles
        })
      })
  }

  onMarkerMounted(element) {
      this.setState(prevState => ({
        markerObjects: [...prevState.markerObjects, element]
      }))
    };

  onMarkerClick(props, marker) {
    const { data } = props
    const { markerObjects } = this.state

    const animatingMarkers = markerObjects

    // For each marker in the state, if the name matches the name of the marker passed into the function
    // As an argument, then set it's animation to bounce, otherwise set the marker animation to null
    animatingMarkers.forEach((m) => {
      if (m.marker.data._id === marker.data._id) {
        m.marker.setAnimation(1);
      } else {
        m.marker.setAnimation(null);
      }
    })

    this.setState({
      responsibleData: data,
      activeMarker: marker,
      showingInfoWindow: true,
      mapCenter: {...data.geolocation},
      zoom: 12,
      markerObjects: animatingMarkers
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
    const { intl, google } = this.props
    const {
      responsibleData = {},
      activeMarker,
      showingInfoWindow,
      mapCenter,
      zoom,
      dsResponsibles = [],
      responsibles = []
    } = this.state

    const responsible = intl.formatMessage({id: 'marker.responsible'}) + responsibleData.name
    const sentTime = intl.formatMessage({id: 'marker.sentTime'}) + responsibleData.lastSentInfoTime
    const status = intl.formatMessage({id: 'marker.status'}) + responsibleData.status
    const online = intl.formatMessage({id: 'marker.online'}) + responsibleData.online

    return (
      <div className='fieldMap'>
        <div className="responsibles_positions_map_title">
          <div className='fieldMapTitle'>
            <FormattedMessage id='respOnMap' />
          </div>
          <div className='form-field listResponsibles'>
            <DropdownList
              name={'responsiblesDropdown'}
              dataSource={dsResponsibles}
              value={''}
              dataTextField={'dataView'}
              dataValueField={'id'}
              headerTemplate={responsible_dd_headerTemplate}
              template={responsible_dd_template}
              searchPlaceholder='Responsible | ID'
              onChange={(val, name) => this.handleSelectResponsible(val)}
              filter={'contains'}
              extraClassName='form-dropdown'
            />
          </div>
        </div>
        <Map
          google={google}
          zoom={zoom}
          style={mapStyles}
          initialCenter={{ lat: mapCenter.lat, lng: mapCenter.lng }}
          center={{ lat: mapCenter.lat, lng: mapCenter.lng }}
          disableDefaultUI={true}
        >
        {
          responsibles.map((responsible) => {
            if (responsible.geolocation.lat) {
              return (
                <Marker ref={this.onMarkerMounted}
                  key={responsible._id}
                  onClick={this.onMarkerClick}
                  data={responsible}
                  zoom={zoom}
                  icon={responsible.online ? this.pinSymbol('#F00') : this.pinSymbol('#ccc')}
                  position={{ lat: responsible.geolocation.lat, lng: responsible.geolocation.lng }}
                />
              )
            }
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

  handleSelectResponsible(id) {
    const { intl } = this.props
    const { markerObjects, responsibles } = this.state
    if (id === '') {
      this.onClose()
      return this.setState({
        zoom: 8,
      })
    }
    let responsible = {data: {}}
    responsible.data = {...responsibles.find((res) => res._id === id)}
    let findMarker = markerObjects.find((mk) => {
      return mk.marker.data._id === id
    })

    if (!findMarker) {
      return alert(
        intl.formatMessage({id: 'noGeolocationFind'})
      )
    }

    this.onMarkerClick(responsible, findMarker.marker)
  }
}

export default injectIntl(GoogleApiWrapper({
  apiKey: env.APY_KEY
})(FieldMap));
