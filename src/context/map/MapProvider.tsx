import React, { useCallback } from "react";
import { useReducer } from "react";

import { MapContext } from "./MapContext";
import { mapReducer } from "./mapReducer";

import { MapState } from "../../interfaces/mapState";
import { Map, Marker, Popup } from "mapbox-gl";

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
    const myLocationPopUp = new Popup({ closeOnClick: false })
      .setHTML(
        `
    <h4>Hola</h4>
    <p>Estas en:</p>
    <p>Latitud: ${map.getCenter().lat}</p>
    <p>Longitud: ${map.getCenter().lng}</p>
    <p>Hasta aca se puede ver como el edward esta abriendo fb en vez de estudiar Java</p>
    `
      )
      .addTo(map);

    new Marker({
      color: "rgb(32, 154, 206)",
    })
      .setLngLat(map.getCenter())
      .setPopup(myLocationPopUp)
      .addTo(map);

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
