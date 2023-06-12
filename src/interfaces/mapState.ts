import { Map } from "mapbox-gl";

export interface MapState {
  isMapReady: boolean;
  map?: Map;
}

export interface MapContextProps extends MapState {
  setMap: (map: Map) => void;
}
