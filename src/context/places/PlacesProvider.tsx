import { useReducer, useEffect } from "react";
import { PlacesState } from "../../interfaces/placesState";
import { PlacesContext } from "./placesContext";
import { placesReducer } from "./placesReducer";
import { getUserLocation } from "../../helpers/getUserLocation";

const INITIAL_VALUE: PlacesState = {
  isLoading: true,
  userLocation: undefined,
};

interface Props {
  children: JSX.Element | JSX.Element[];
}

export const PlacesProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(placesReducer, INITIAL_VALUE);

  useEffect(() => {
    getUserLocation().then((userLocation) => {
      dispatch({
        type: "setUserLocation",
        payload: userLocation,
      });
    });
  }, []);

  return (
    <PlacesContext.Provider value={{ ...state }}>
      {children}
    </PlacesContext.Provider>
  );
};
