import ReactDOM from "react-dom/client";

import mapboxgl from "mapbox-gl";

import { MapsApp } from "./MapsApp.tsx";

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_API_KEY as string;

if (!navigator.geolocation) {
  const message = "Geolocation is not supported by your browser";

  alert(message);
  throw new Error(message);
}

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <MapsApp />
);
