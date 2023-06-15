import axios from "axios";

const directionsApi = axios.create({
  baseURL: `${import.meta.env.VITE_MAPBOX_API_URL}/directions/v5/mapbox/driving`,
  headers: {
    "Content-Type": "application/json",
  },
  params: {
    access_token: import.meta.env.VITE_MAPBOX_API_KEY,
    geometries: "geojson",
    language: "es",
    alternatives: false,
    steps: false,
    overview: "simplified"
  },
});

export default directionsApi;
