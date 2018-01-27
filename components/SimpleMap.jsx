/* global google */
import { default as React, Component } from 'react';
import {
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow,
  OverlayView
} from 'react-google-maps';

import SearchBox from '~/node_modules/react-google-maps/lib/components/places/SearchBox';
import fancyMapStyles from '~/public/fancyMapStyles.js';

import { Button } from 'react-materialize';
const INPUT_STYLE = {
  backgroundColor: `white`,
  boxSizing: `border-box`,
  MozBoxSizing: `border-box`,
  border: `1px solid transparent`,
  width: `312px`,
  height: `32px`,
  marginTop: `27px`,
  padding: `0 12px`,
  borderRadius: `1px`,
  boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
  fontSize: `14px`,
  outline: `none`,
  zIndex: '99',
  textOverflow: `ellipses`
};

const SearchBoxExampleGoogleMap = withGoogleMap(props =>
  <GoogleMap
    ref={props.onMapMounted}
    defaultZoom={14}
    center={props.center}
    onBoundsChanged={props.onBoundsChanged}
    defaultOptions={{ styles: fancyMapStyles }}
  >
    <SearchBox
      ref={props.onSearchBoxMounted}
      bounds={props.bounds}
      controlPosition={google.maps.ControlPosition.TOP_LEFT}
      onPlacesChanged={props.onPlacesChanged}
    >
      <input
        type="text"
        placeholder="Search housing in Providence."
        style={INPUT_STYLE}
      />
    </SearchBox>
    {props.markers.length !== 0 &&
      props.markers.map((marker, index) =>
        <Marker
          position={marker.position}
          key={index}
          onClick={() => props.onMarkerClicker(marker)}
          icon={marker.color}
        >
          {marker.showInfo &&
            <InfoWindow onCloseClick={() => marker.handler(marker)}>
              <div>
                {marker.infoContent}
              </div>
            </InfoWindow>}
        </Marker>
      )}
    <div id="status-board" className="dropSheet">
      {props.markers[props.markers.length - 1] &&
        props.markers[
          props.markers.length - 1
        ].infoContent.props.children.slice(0, 13)}
    </div>
  </GoogleMap>
);

/*
 * https://developers.google.com/maps/documentation/javascript/examples/places-searchbox
 *
 * Add <script src="https://maps.googleapis.com/maps/api/js"></script> to your HTML to provide google.maps reference
 */
export default class SimpleMap extends Component {
  state = {
    bounds: null,
    center: {
      lat: 41.827805,
      lng: -71.401058
    },
    markers: [],
    currentMarker: {}
  };

  handleMapMounted = map => {
    this._map = map;
  };

  handleBoundsChanged = () => {
    this.setState({
      bounds: this._map.getBounds(),
      center: this._map.getCenter()
    });
  };

  handleSearchBoxMounted = searchBox => {
    this._searchBox = searchBox;
  };

  handlePlacesChanged = () => {
    const places = this._searchBox.getPlaces();

    const markers = places.map(place => {
      console.log(place.name);
      let markerObj = {
        position: place.geometry.location,
        infoContent: (
          <div key={place.formatted_address}>
            <b>Information</b>
            <br />
            Name: {place.name}
            <br />
            Address: {place.formatted_address}
            <br />
            Phone: {place.formatted_phone_number}
            <br />
            Website:{' '}
            <a target="_blank" href={place.website}>
              {place.website}
            </a>
            <br />
            <b>Recommended By</b>
<br />;          </div>
        ),
        showInfo: false,
        handler: this.handleOwnMarkerClose,
        color: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png'
      };
      return markerObj;
    });

    const mapCenter =
      markers.length > 0 ? markers[0].position : this.state.center;

    this.setState({
      center: mapCenter,
      markers: [...this.state.markers, ...markers]
    });
  };

  handleMarkerClicker = targetMarker => {
    let setInfo;
    if (targetMarker.showInfo) setInfo = false;
    else setInfo = true;
    this.setState({
      markers: this.state.markers.map(marker => {
        if (marker === targetMarker) {
          return {
            ...marker,
            showInfo: setInfo
          };
        }
        return marker;
      })
    });
  };

  handleOtherMarkerClose = targetMarker => {
    this.setState({
      markers: this.state.markers.map(marker => {
        if (marker === targetMarker) {
          return {
            ...marker,
            showInfo: false
          };
        }
        return marker;
      })
    });
  };

  handleOwnMarkerClose = targetMarker => {};

  render() {
    return (
      <SearchBoxExampleGoogleMap
        containerElement={<div style={{ height: `95vh`, width: `50%` }} />}
        mapElement={<div style={{ height: `95vh` }} />}
        center={this.state.center}
        onMapMounted={this.handleMapMounted}
        onBoundsChanged={this.handleBoundsChanged}
        onSearchBoxMounted={this.handleSearchBoxMounted}
        bounds={this.state.bounds}
        onPlacesChanged={this.handlePlacesChanged}
        markers={this.state.markers}
        onMarkerClicker={this.handleMarkerClicker}
      />
    );
  }
}
