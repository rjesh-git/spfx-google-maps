export interface IGoogleMapProps {
  zoomLevel: number;
  loadMarkers: () => Promise<any[]>;
  initialLat: number;
  initialLon: number;
  google: any;
}
