declare interface IMapDocumentsStrings {
  PropertyPaneDescription: string;
  BasicGroupName: string;
  ListFieldLabel: string;
  TroubleShootingGroupName: string;
  DebugLabel: string;
  DebugOnText: string;
  DebugOffText: string;
  MapZoomLevelLabel: string;
}

declare module 'mapDocumentsStrings' {
  const strings: IMapDocumentsStrings;
  export = strings;
}
