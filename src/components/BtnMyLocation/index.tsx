import { useContext } from "react";
import "./style.css";
import { MapContext, PlacesContext } from "../../context";

export const BtnMyLocation = () => {
  const { isMapReady, map } = useContext(MapContext);
  const { userLocation } = useContext(PlacesContext);

  const handleMyLocation = () => {
    if (!isMapReady || !map) {
      throw new Error("Map is not ready");
    }

    map.flyTo({
      zoom: 14,
      center: userLocation,
    });
  };

  return (
    <button
      className="btn btn-primary btn-my_location"
      onClick={handleMyLocation}
    >
      Mi Ubicacion
    </button>
  );
};
