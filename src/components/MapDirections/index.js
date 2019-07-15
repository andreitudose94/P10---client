import React, {Component} from 'react'
import { FormattedMessage, connect } from 'lib'
import env from '../../../env.json'
import styles from './index.scss'
const { compose, withProps, lifecycle } = require("recompose");

const {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  DirectionsRenderer,
} = require("react-google-maps");

const MapWithADirectionsRenderer = compose(
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?key=" + env.APY_KEY + "&v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div className={'loadingElement'} />,
    containerElement: <div style={{ height: '400px' }} />,
    mapElement: <div className={'mapElement'} />,
  }),
  withScriptjs,
  withGoogleMap,
  lifecycle({
    componentDidMount() {
      const { eventAddressGeolocation = {}, responsibleGeolocation = {} } = this.props

      const DirectionsService = new google.maps.DirectionsService();
      DirectionsService.route({
        origin: new google.maps.LatLng(responsibleGeolocation.lat, responsibleGeolocation.lng),
        destination: new google.maps.LatLng(eventAddressGeolocation.lat, eventAddressGeolocation.lng),
        travelMode: google.maps.TravelMode.DRIVING,
      }, (result, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          this.setState({
            directions: result,
          });
        } else {
          console.error(`error fetching directions ${result}`);
        }
      });
    },

    componentDidUpdate(prevProps) {
      const { eventAddressGeolocation = {}, responsibleGeolocation = {} } = this.props

      const DirectionsService = new google.maps.DirectionsService();

      DirectionsService.route({
        origin: new google.maps.LatLng(responsibleGeolocation.lat, responsibleGeolocation.lng),
        destination: new google.maps.LatLng(eventAddressGeolocation.lat, eventAddressGeolocation.lng),
        travelMode: google.maps.TravelMode.DRIVING,
      }, (result, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          this.setState({
            directions: result,
          });
        } else {
          console.error(`error fetching directions ${result}`);
        }
      });
    }
  })
)(props =>
  <GoogleMap
    defaultZoom={9}
    defaultCenter={new google.maps.LatLng(44.863743, 24.910947)}
  >
    {props.directions && <DirectionsRenderer directions={props.directions} />}
  </GoogleMap>
);

<MapWithADirectionsRenderer />
export default MapWithADirectionsRenderer
