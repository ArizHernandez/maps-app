import { useCallback, useState } from "react";
import { useReducer, useContext, useEffect } from "react";

import { Map, Marker, Popup } from "mapbox-gl";

import { MapContext } from "./MapContext";
import { mapReducer } from "./mapReducer";
import { MapState } from "../../interfaces/mapState";
import { Feature } from "../../interfaces/placesState";
import { PlacesContext } from "..";

type Props = {
  children: React.ReactNode;
};

const INITIAL_STATE: MapState = {
  isMapReady: false,
  map: undefined,
  markers: [],
};

export const MapProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(mapReducer, INITIAL_STATE);
  const { places } = useContext(PlacesContext);

  const [actualPlaces, setActualPlaces] = useState<Feature[]>([]);

  const setMap = useCallback((map: Map) => {
    const myLocationPopUp = new Popup({ closeOnClick: false })
      .setHTML(
        `
        <h4>Estás aquí</h4>
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

  useEffect(() => {
    if (JSON.stringify(places) === JSON.stringify(actualPlaces)) return;

    state.markers.forEach((marker) => marker.remove());

    setActualPlaces(places);
    const newMarkers: Marker[] = [];

    places.forEach((place) => {
      const [lng, lat] = place.center;
      const popUp = new Popup({ closeOnClick: false }).setHTML(
        `
          <h4>${place.text_es}</h4>
          <p>${place.place_name_es}</p>
        `
      );

      const newMarker = new Marker({
        color: "rgb(32, 154, 206)",
      })
        .setPopup(popUp)
        .setLngLat([lng, lat])
        .addTo(state.map as Map);

      newMarkers.push(newMarker);
    });

    dispatch({
      type: "setMarkers",
      payload: newMarkers,
    });
  }, [actualPlaces, places, state.map, state.markers]);

  return (
    <MapContext.Provider value={{ ...state, setMap }}>
      {children}
    </MapContext.Provider>
  );
};
