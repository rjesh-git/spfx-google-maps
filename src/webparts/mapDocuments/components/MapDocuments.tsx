import * as React from 'react';
import styles from './MapDocuments.module.scss';
import { IMapDocumentsProps } from './IMapDocumentsProps';
import { escape } from '@microsoft/sp-lodash-subset';
import GoogleMaps from './GoogleMap'

export default class MapDocuments extends React.Component<IMapDocumentsProps, void> {

  constructor (props) {
    super(props);
  }

  public render(): React.ReactElement<IMapDocumentsProps> {
    return (
       <GoogleMaps
       { ...this.props}
       />
    );
  }
}
