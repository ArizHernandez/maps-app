import { useContext, useState } from "react";

import { MapContext, PlacesContext } from "../../context";
import { LoadingSpinner } from "..";
import "./styles.css";
import { Feature } from "../../interfaces/placesState";
import { LngLatLike } from "mapbox-gl";

export const SearchResults = () => {
  const { places, isLoadingPlaces } = useContext(PlacesContext);
  const { map } = useContext(MapContext);

  const [activePlace, setActivePlace] = useState<string>();

  if (isLoadingPlaces) return <LoadingSpinner />;

  if (!places.length) return null;

  const handleDirectionSelected = (place: Feature) => {
    if (!map) return;

    setActivePlace(place.id);

    map?.flyTo({
      center: place.center as LngLatLike,
      zoom: 14,
    });
  };

  return (
    <ul className="search-result__list list-grup mt-3">
      {places.map((place) => (
        <li
          key={place.id}
          className={`search-result__item list-group-item list-group-item-action ${
            place.id === activePlace ? "active" : ""
          }`}
          onClick={() => {
            handleDirectionSelected(place);
          }}
        >
          <h4 className="search-result__item-place">{place.text_es}</h4>
          <p className="search-result__item-description text-muted">
            {place.place_name_es}
          </p>
          <button
            className={`btn ${
              place.id === activePlace ? "btn-primary" : "btn-outline-primary"
            }`}
          >
            Direcciones
          </button>
          <hr className="mb-0" />
        </li>
      ))}
    </ul>
  );
};
