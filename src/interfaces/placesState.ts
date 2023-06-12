export interface PlacesState {
  isLoading: boolean;
  userLocation?: [number, number];
}

export interface PlacesContextProps extends PlacesState {}
