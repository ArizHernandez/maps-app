import { useReducer, useEffect } from "react";
import { PlacesState } from "../../interfaces/placesState";
import { PlacesContext } from "./placesContext";
import { placesReducer } from "./placesReducer";
import { getUserLocation } from "../../helpers/getUserLocation";
import { useSearch } from "../../hooks";

const INITIAL_VALUE: PlacesState = {
  isLoading: true,
  userLocation: undefined,
  places: [],
  isLoadingPlaces: false,
};

interface Props {
  children: JSX.Element | JSX.Element[];
}

export const PlacesProvider = ({ children }: Props) => {
  const [search] = useSearch();
  const [state, dispatch] = useReducer(placesReducer, INITIAL_VALUE);

  const searchPlaces = async (query: string) => {
    dispatch({ type: "setLoadingPlaces" });
    const places = await search(query);

    dispatch({
      type: "setPlaces",
      payload: places?.features || [],
    });
    console.log(places);
  };

  useEffect(() => {
    getUserLocation().then((userLocation) => {
      dispatch({
        type: "setUserLocation",
        payload: userLocation,
      });
    });
  }, []);

  return (
    <PlacesContext.Provider value={{ ...state, searchPlaces }}>
      {children}
    </PlacesContext.Provider>
  );
};
