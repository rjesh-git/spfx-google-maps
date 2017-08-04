export interface IGoogleMapProps {
  zoomLevel: number;
  label: string;
  loadMarkers: () => Promise<any[]>;
  initialLat: number;
  initialLon: number;
  google: any;
}
