import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

import * as strings from 'mapDocumentsStrings';
import MapDocuments from './components/MapDocuments';
import { IMapDocumentsProps } from './components/IMapDocumentsProps';
import { IMapDocumentsWebPartProps } from './IMapDocumentsWebPartProps';

export default class MapDocumentsWebPart extends BaseClientSideWebPart<IMapDocumentsWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IMapDocumentsProps > = React.createElement(
      MapDocuments,
      {
        description: this.properties.description
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
