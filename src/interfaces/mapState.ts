import { Map, Marker } from "mapbox-gl";

export interface MapState {
  isMapReady: boolean;
  map?: Map;
  markers: Marker[];
}

export interface MapContextProps extends MapState {
  setMap: (map: Map) => void;
  getRouteBetweenPoints: (
    start: [number, number],
    end: [number, number]
  ) => Promise<void>;
}
