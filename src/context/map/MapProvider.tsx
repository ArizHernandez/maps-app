import { useCallback, useState } from "react";
import { useReducer, useContext, useEffect } from "react";

import { AnySourceData, LngLatBounds, Map, Marker, Popup } from "mapbox-gl";

import { MapContext } from "./MapContext";
import { mapReducer } from "./mapReducer";
import { MapState } from "../../interfaces/mapState";
import { Feature } from "../../interfaces/placesState";
import { PlacesContext } from "..";
import { directionsApi } from "../../apis";
import { DirectionsResponse } from "../../interfaces/directions";

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

  const getRouteBetweenPoints = async (
    start: [number, number],
    end: [number, number]
  ) => {
    try {
      const response = await directionsApi.get<DirectionsResponse>(
        `/${start.join(",")};${end.join(",")}`,
        {}
      );

      const { geometry } = response.data.routes[0];
      const { coordinates: coords } = geometry;

      // const km = Math.round((distance / 1000) * 100) / 100;
      // const minutes = Math.round(duration / 60);

      const bounds = new LngLatBounds(start, start);

      coords.forEach((coord) => {
        bounds.extend(coord as [number, number]);
      });

      state.map?.fitBounds(bounds, {
        padding: 200,
      });

      setPolilines(coords);
    } catch (error) {
      alert("No se pudo obtener la ruta");
      console.error(error);
    }
  };

  const setPolilines = (coords: number[][]) => {
    const sourceData: AnySourceData = {
      type: "geojson",
      data: {
        type: "FeatureCollection",
        features: [
          {
            type: "Feature",
            properties: {},
            geometry: {
              type: "LineString",
              coordinates: coords,
            },
          },
        ],
      },
    };

    cleanMarkers();

    state.map?.addSource("RoutePathLine", sourceData);
    state.map?.addLayer({
      id: "RoutePathLine",
      type: "line",
      source: "RoutePathLine",
      layout: {
        "line-join": "round",
        "line-cap": "round",
      },
      paint: {
        "line-color": "rgba(99, 211, 255, 0.365)",
        "line-width": 8,
      },
    });
  };

  const cleanMarkers = useCallback(() => {
    if (state.map?.getSource("RoutePathLine")) {
      state.map?.removeLayer("RoutePathLine");
      state.map?.removeSource("RoutePathLine");
    }
  }, [state.map]);

  useEffect(() => {
    if (JSON.stringify(places) === JSON.stringify(actualPlaces)) return;

    setActualPlaces(places);
    state.markers.forEach((marker) => marker.remove());
    cleanMarkers();

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
  }, [actualPlaces, places, state.map, state.markers, cleanMarkers]);

  return (
    <MapContext.Provider value={{ ...state, setMap, getRouteBetweenPoints }}>
      {children}
    </MapContext.Provider>
  );
};
