import React, { useCallback } from "react";
import { useReducer } from "react";

import { MapContext } from "./MapContext";
import { mapReducer } from "./mapReducer";

import { MapState } from "../../interfaces/mapState";
import { Map } from "mapbox-gl";

type Props = {
  children: React.ReactNode;
};

const INITIAL_STATE: MapState = {
  isMapReady: false,
  map: undefined,
};

export const MapProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(mapReducer, INITIAL_STATE);

  const setMap = useCallback((map: Map) => {
    dispatch({
      type: "setMap",
      payload: map,
    });
  }, []);

  return (
    <MapContext.Provider value={{ ...state, setMap }}>
      {children}
    </MapContext.Provider>
  );
};
