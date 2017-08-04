import * as React from 'react';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
import { IGoogleMapProps } from './IGoogleMapProps';

export class GoogleMap extends React.Component<IGoogleMapProps, any> {

  constructor (props) {
    super(props);
  }

  private defaultProps: any = {
    center: {lat: 59.95, lng: 30.33},
    zoom: 11
  };

  private style: any = {
    width: '100%',
    height: '100%'
  };

  public render(): React.ReactElement<IGoogleMapProps> {
    return (
       <div style={{height: `700px`}}>
      <Map google={this.props.google}
          style= {this.style}
          initialCenter={{
            lat: 37.4273893,
            lng: -122.1713498
          }}
          zoom={this.props.zoomLevel}>
      </Map>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyDeYnX9jev7RqoRTnM43vWfDblMIxBWa1g"
})(GoogleMap)


