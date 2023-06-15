import axios from "axios";

const directionsApi = axios.create({
  baseURL: `${import.meta.env.VITE_MAPBOX_API_URL}/mapbox/driving`,
  headers: {
    "Content-Type": "application/json",
  },
  params: {
    access_token: import.meta.env.VITE_MAPBOX_API_KEY,
    geometries: "geojson",
    language: "es",
    alternatives: false,
    steps: false,
  },
});

export default directionsApi;
