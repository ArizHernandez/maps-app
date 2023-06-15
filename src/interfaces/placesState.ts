import { LngLatLike } from "mapbox-gl";

export interface PlacesState {
  isLoading:        boolean;
  isLoadingPlaces:  boolean;
  places:           Feature[];
  userLocation?:    [number, number];
}

export interface PlacesContextProps extends PlacesState {
  searchPlaces: (query: string) => Promise<void>;
}

export interface PlacesResponse {
  type:        string;
  query:       string[];
  features:    Feature[];
  attribution: string;
}

export interface Feature {
  id:                   string;
  type:                 string;
  place_type:           string[];
  relevance:            number;
  properties:           Properties;
  text_es:              string;
  language_es:          string;
  place_name_es:        string;
  text:                 string;
  language:             string;
  place_name:           string;
  matching_text?:       string;
  matching_place_name?: string;
  center:               number[];
  geometry:             Geometry;
  context?:             Context[];
  bbox?:                number[];
}

export interface Context {
  id:          string;
  wikidata:    string;
  mapbox_id:   string;
  text_es:     string;
  language_es: string;
  text:        string;
  language:    string;
  short_code?: string;
}

export interface Geometry {
  coordinates: LngLatLike;
  type:        string;
}

export interface Properties {
  wikidata:    string;
  landmark?:   boolean;
  address?:    string;
  foursquare?: string;
  category?:   string;
  mapbox_id?:  string;
  short_code?: string;
}
