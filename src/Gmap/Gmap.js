import React, { Component } from 'react';
import { GoogleMap, Marker,withGoogleMap } from "react-google-maps"
 

class SimpleMap extends Component {
  state = {
    center: {
      lat: 61.26,
      lng:  73.4
    },
    zoom: 13
  };
 
  render() {
    return (
      // Important! Always set the container height explicitly
      <withGoogleMap>
      <div style={{ height: '400px', width: '70%' }}>
        <GoogleMap
          bootstrapURLKeys={{ key: 'AIzaSyDCLzal19q6Nnm4SArgAVxEUPXTIC_tI3c'}}
          defaultCenter={this.state.center}
          defaultZoom={this.state.zoom}
          yesIWantToUseGoogleMapApiInternals
        
        >   
          <Marker
            lat={59.955413}
            lng={30.337844}
            text="My Marker"
          />
        </GoogleMap>
      </div>
      </withGoogleMap>
    );
  }
}
 
export default SimpleMap;