import React, { Component } from 'react';
import { db, storage, auth } from '~/fire';
import '~/public/post.css';
import LoaderButton from './LoaderButton';

import {
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow,
  OverlayView
} from 'react-google-maps';
import {
  Row,
  Col,
  Card,
  Input,
  Icon,
  MediaBox,
  Button
} from 'react-materialize';
import StandaloneSearchBox from '~/node_modules/react-google-maps/lib/components/places/StandaloneSearchBox';
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
const PlacesWithStandaloneSearchBox = withGoogleMap(props =>
  <div data-standalone-searchbox="">
    <StandaloneSearchBox
      ref={props.onSearchBoxMounted}
      bounds={props.bounds}
      onPlacesChanged={props.onPlacesChanged}
    >
      <input
        type="text"
        placeholder="Customized your placeholder"
        style={{
          boxSizing: `border-box`,
          border: `1px solid transparent`,
          width: `240px`,
          height: `32px`,
          padding: `0 12px`,
          borderRadius: `3px`,
          boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
          fontSize: `14px`,
          outline: `none`,
          textOverflow: `ellipses`
        }}
      />
    </StandaloneSearchBox>
  </div>
);

export default class CreateHome extends Component {
  constructor(props) {
    super(props);
    console.log(auth.currentUser);
    this.state = {
      files: [],
      imagePreviewUrl: [],
      addrInfo: '',
      position: [],
      roomInfo: '',
      description: '',
      userEmail: props.email,
      purpose: 'rental',
      price: ''
    };
  }

  onChange = e => {
    let reader = new FileReader();
    let file = e.target.files[0];
    let { files, imagePreviewUrl } = this.state;
    reader.onloadend = () => {
      this.setState({
        files: [...files, file],
        imagePreviewUrl: [...imagePreviewUrl, reader.result]
      });
    };
    reader.readAsDataURL(file);
  };

  onSubmit = e => {
    let { files } = this.state;
    let { email } = auth.currentUser;
    let storageRef = storage.ref();
    e.preventDefault();
    storageRef.constructor.prototype.putFiles = function(files) {
      return Promise.all(
        files.map(function(files) {
          return storageRef.child(`/images/${email}/${files.name}`).put(files);
        })
      );
    };

    storageRef
      .putFiles(files)
      .then(function(metadatas) {
        // Get an array of file metadata
        console.log('metaData', metadatas);
      })
      .catch(function(error) {
        console.error(error);
      });
  };

  handleInput = evt => {
    this.setState({
      [evt.target.name]: evt.target.value
    });
  };

  handleSearchBoxMounted = searchBox => {
    this._searchBox = searchBox;
  };

  handlePlacesChanged = () => {
    const places = this._searchBox.getPlaces();
    this.setState({
      position: [
        places[0].geometry.location.lat(),
        places[0].geometry.location.lng()
      ],
      addrInfo: places[0].formatted_address
    });

    //     color: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png'
  };

  render() {
    let { files, imagePreviewUrl } = this.state;
    return (
      <div className="post">
        <form onSubmit={this.onSubmit}>
          <Row>
            <Input
              s={12}
              type="select"
              name="purpose"
              label="Post Purposes"
              defaultValue="2"
              onChange={this.handleInput}
            >
              <option value="assist">Assist</option>
              <option value="rental">Rental</option>
            </Input>
          </Row>
          <Row>
            <PlacesWithStandaloneSearchBox
              containerElement={
                <div style={{ float: `left`, height: `5vh`, width: `50%` }} />
              }
              mapElement={<div style={{ height: `0` }} />}
              center={this.state.center}
              onMapMounted={this.handleMapMounted}
              onBoundsChanged={this.handleBoundsChanged}
              onSearchBoxMounted={this.handleSearchBoxMounted}
              bounds={this.state.bounds}
              onPlacesChanged={this.handlePlacesChanged}
              markers={this.state.markers}
              onMarkerClicker={this.handleMarkerClicker}
            />
          </Row>
          <Row>
            <Input
              s={6}
              name="roomInfo"
              label="Room Detail"
              value={this.state.roomInfo}
              onChange={this.handleInput}
            />
          </Row>
          <Row>
            <Input
              s={6}
              name="description"
              label="Description"
              value={this.state.description}
              onChange={this.handleInput}
            />
          </Row>
          <Row>
            <Input
              s={6}
              name="price"
              label="Price"
              value={this.state.price}
              onChange={this.handleInput}
            />
          </Row>

          <Row>
            <div className="file-field input-field">
              <div className="btn">
                <span>File</span>
                <input type="file" onChange={this.onChange} />
              </div>
              <div className="file-path-wrapper">
                <input
                  className="file-path validate"
                  type="text"
                  placeholder="Upload one or more files"
                />
              </div>
            </div>
          </Row>
          {imagePreviewUrl &&
            imagePreviewUrl.map((url, idx) => {
              return (
                <img
                  className="roomImage"
                  key={idx}
                  src={url}
                  onClick={() => this.onClick(url)}
                />
              );
            })}
          <Row>
            <Col offset="s2 m1 l3" s={12} m={8} l={10} className="blue-text">
              <LoaderButton
                type="submit"
                waves="light"
                className="blue white-text"
                text="post"
                loadingText="Posting..."
              />
            </Col>
          </Row>
        </form>
      </div>
    );
  }
}
