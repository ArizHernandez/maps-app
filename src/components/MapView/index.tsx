import { useContext, useLayoutEffect, useRef } from "react";
import { MapContext, PlacesContext } from "../../context";
import { Loading } from "../Loading";
import { Map } from "mapbox-gl";

export const MapView = () => {
  const mapDiv = useRef<HTMLDivElement>(null);

  const { isLoading, userLocation } = useContext(PlacesContext);
  const { setMap } = useContext(MapContext);

  useLayoutEffect(() => {
    if (!isLoading) {
      const map = new Map({
        container: mapDiv.current ?? "", // container ID
        style: "mapbox://styles/mapbox/dark-v11", // style URL
        center: userLocation, // starting position [lng, lat]
        zoom: 14, // starting zoom
      });

      if (!map) {
        alert("Map is not ready");

        return;
      }

      map.on("load", () => {
        setMap(map);
      });
    }
  }, [isLoading, userLocation, setMap]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div
      ref={mapDiv}
      style={{
        backgroundColor: "red",
        height: "100vh",
        left: 0,
        position: "fixed",
        top: 0,
        width: "100vw",
      }}
    >
      {userLocation?.join(", ")}
    </div>
  );
};
