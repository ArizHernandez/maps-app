import { MapProvider, PlacesProvider } from "./context";
import { HomeScreen } from "./screens";

export const MapsApp = () => {
  return (
    <MapProvider>
      <PlacesProvider>
        <HomeScreen />
      </PlacesProvider>
    </MapProvider>
  );
};
