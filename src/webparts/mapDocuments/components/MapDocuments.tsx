import * as React from 'react';
import styles from './MapDocuments.module.scss';
import { IMapDocumentsProps } from './IMapDocumentsProps';
import { escape } from '@microsoft/sp-lodash-subset';

export default class MapDocuments extends React.Component<IMapDocumentsProps, void> {

  public render(): React.ReactElement<IMapDocumentsProps> {
    return (
      <div className={styles.mapDocuments}>
        <div className={styles.container}>
          <span className={styles.label}>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</span>
        </div>
        <div id="map_canvas" className="mapping"></div>
      </div>
    );
  }
}
