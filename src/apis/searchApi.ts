import axios from "axios";

const searchApi = axios.create({
  baseURL: `${import.meta.env.VITE_MAPBOX_API_URL}/geocoding/v5/mapbox.places`,
  headers: {
    "Content-Type": "application/json",
  },
  params: {
    language: "es",
    limit: 5,
    proximity: "ip",
    access_token: import.meta.env.VITE_MAPBOX_API_KEY,
  },
});

export default searchApi;
