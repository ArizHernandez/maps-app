import { Feature, PlacesState } from "../../interfaces/placesState";

type PlacesAction =
  | { type: "setUserLocation"; payload: [number, number] }
  | { type: "setPlaces"; payload: Feature[] }
  | { type: "setLoadingPlaces" };

export const placesReducer = (
  state: PlacesState,
  action: PlacesAction
): PlacesState => {
  switch (action.type) {
    case "setUserLocation":
      return {
        ...state,
        isLoading: false,
        userLocation: action.payload,
      };

    case "setPlaces":
      return {
        ...state,
        isLoadingPlaces: false,
        places: action.payload,
      };

    case "setLoadingPlaces":
      return {
        ...state,
        isLoadingPlaces: true,
      };
    default:
      return state;
  }
};
