import * as React from 'react';
import GoogleMapReact from 'google-map-react';
const AnyReactComponent = ({ text }) => <div>{text}</div>;

export class MapContainer extends React.Component<void, void> {
  static defaultProps = {
    center: {lat: 59.95, lng: 30.33},
    zoom: 11
  };

  render() {
    return (
      <GoogleMapReact>
        <AnyReactComponent
          text={'Kreyser Avrora'}
        />
      </GoogleMapReact>
    );
  }
}
