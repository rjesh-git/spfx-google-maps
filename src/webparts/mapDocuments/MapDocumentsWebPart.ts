import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneCheckbox,
  PropertyPaneDropdown,
  PropertyPaneToggle,
  PropertyPaneSlider
} from '@microsoft/sp-webpart-base';

import { IDropdownOption } from 'office-ui-fabric-react';

import {
  Environment,
  EnvironmentType
} from '@microsoft/sp-core-library';

import * as strings from 'mapDocumentsStrings';
import GoogleMaps from './components/GoogleMap';
import { IGoogleMapProps } from './components/IGoogleMapProps';
import { IMapDocumentsWebPartProps } from './IMapDocumentsWebPartProps';

import { IList, IListItem, ListService, MockListService } from './services';
import { PropertyPaneAsyncDropdown } from './components/PropertyPaneAsyncDropdown';

export default class MapDocumentsWebPart extends BaseClientSideWebPart<IMapDocumentsWebPartProps> {
  public render(): void {
    const element: React.ReactElement<any> = React.createElement(
      GoogleMaps, {
        zoomLevel: this.properties.mapZoomLevel
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
                new PropertyPaneAsyncDropdown('list', {
                  key: 'asyncUniqueKeyList',
                  label: strings.ListFieldLabel,
                  loadOptions: this.loadLists.bind(this),
                  onPropertyChange: this.onListChange.bind(this),
                  selectedKey: this.properties.list
                }),
                PropertyPaneSlider ('mapZoomLevel', {
                  label: strings.MapZoomLevelLabel,
                  min: 1,
                  max: 21
                })
              ]
            },
            {
              groupName: strings.TroubleShootingGroupName,
              groupFields: [
                PropertyPaneToggle('debugMode', {
                  label: strings.DebugLabel,
                  onText: strings.DebugOnText,
                  offText: strings.DebugOffText
                })
              ]
            }
          ]
        }
      ]
    };
  }

  private loadLists(): Promise<IDropdownOption[]> {
    const dataService = (Environment.type === EnvironmentType.Test || Environment.type === EnvironmentType.Local) ?
        new MockListService() :
        new ListService(this.context);

    return new Promise<IDropdownOption[]>(resolve => {
      dataService.getLists()
      .then((response: IList[]) => {
          var options : IDropdownOption[] = [];

          response.forEach((item: IList) => {
            options.push({"key": item.Id, "text": item.Title});
          });

          resolve(options);
      });
    });
  }

  private loadItems(): Promise<IDropdownOption[]> {
    if (!this.properties.list) {
      // resolve to empty options since no list has been selected
      return Promise.resolve();
    }

    const dataService = (Environment.type === EnvironmentType.Test || Environment.type === EnvironmentType.Local) ?
        new MockListService() :
        new ListService(this.context);

    return new Promise<IDropdownOption[]>(resolve => {
      dataService.getList(this.properties.list)
      .then((response) => {
          var options : IDropdownOption[] = [];

          response.forEach((item: IListItem) => {
            options.push({"key": item.Id, "text": item.Title});
          });

          resolve(options);
      });
    });
  }

  private onListChange(propertyPath: string, oldValue: any, newValue: any): void {
    // TODO: Add the list change logic here
    if (this.properties.debugMode) {
      console.log(`PropertyPath: ${propertyPath} oldValue: ${oldValue} newValue: ${newValue}`);
    }
  }

}
