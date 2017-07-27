import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

import { SPComponentLoader, ILoadScriptOptions } from '@microsoft/sp-loader';
import * as strings from 'mapDocumentsStrings';
import MapDocuments from './components/MapDocuments';
import { IMapDocumentsProps } from './components/IMapDocumentsProps';
import { IMapDocumentsWebPartProps } from './IMapDocumentsWebPartProps';
import { defer, IDeferred } from './utils/defer';
import { IScripts } from './utils/IModels';


export default class MapDocumentsWebPart extends BaseClientSideWebPart<IMapDocumentsWebPartProps> {

  public render(): void {

    const externalTmpl: ILoadScriptOptions = {
        globalExportsName: "GoogleMaps"
    };


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

  /**
	 * Load all scripts required to render the element
	 */
	private _loadScriptsBeforeRender(scriptsToLoad?: IScripts[]): Promise<any> {
		return new Promise<any>((resolve, reject) => {
			this._loadScripts(scriptsToLoad).then(() => {
				resolve();
			}).catch((err) => {
				reject(err);
			});
		});
	}
  /**
	 * Append the scripts to load
	 */
	private _loadScripts(scriptsToLoad: IScripts[], deferred?: IDeferred<any>): Promise<any> {
		if (!deferred) {
			deferred = defer();
		}
		if (scriptsToLoad.length > 0) {
			if (this.TypeofFullName(scriptsToLoad[0].funcName) === "function") {
				return this._loadScripts(scriptsToLoad.slice(1, scriptsToLoad.length), deferred);
			}

			var script = document.createElement('script');
			script.type = 'text/javascript';
			script.src = scriptsToLoad[0].url;
			// Wait untin script is loaded
			script.onload = () => {
				// Load the next script
				return this._loadScripts(scriptsToLoad.slice(1, scriptsToLoad.length), deferred);
			};
			document.getElementsByTagName('head')[0].appendChild(script);
		} else {
			deferred.resolve(null);
		}

		return deferred.promise;
  }

  /**
	 * Check the type of the function name
	 */
	private TypeofFullName(funcName: string): string {
		if (!Boolean(funcName)) {
			return "undefined";
		}
		const funcSplit: string[] = funcName.split(".");
		let scriptFunc: any = window;
		for (let i: number = 0; i < funcSplit.length; i++) {
			scriptFunc = scriptFunc[funcSplit[i]];
			if (typeof scriptFunc == "undefined")
				return "undefined";
		}
		return typeof scriptFunc;
	}
}
