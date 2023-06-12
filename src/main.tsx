import ReactDOM from "react-dom/client";
import { MapsApp } from "./MapsApp.tsx";
import mapboxgl from "mapbox-gl";

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_KEY as string;

if (!navigator.geolocation) {
  const message = "Geolocation is not supported by your browser";

  alert(message);
  throw new Error(message);
}

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <MapsApp />
);
