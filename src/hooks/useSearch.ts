import { useEffect, useMemo, useState } from "react";

import searchApi from "../apis/searchApi";
import { PlacesResponse } from "../interfaces/placesState";

type UseSearchServiceReturnType = [
  search: (place: string) => Promise<PlacesResponse>,
  searchData: PlacesResponse
];

export const useSearch = (): UseSearchServiceReturnType => {
  const [searchData, setSearchData] = useState<PlacesResponse>(
    {} as PlacesResponse
  );

  const controller = useMemo(() => new AbortController(), []);

  const search = async (place: string): Promise<PlacesResponse> => {
    try {
      const response = await searchApi.get<PlacesResponse>(`/${place}.json`, {
        signal: controller.signal,
      });

      setSearchData(response.data);
      return response.data;
    } catch (error) {
      console.log(error);
      alert("Error en la búsqueda");
      return {} as PlacesResponse;
    }
  };

  useEffect(() => {
    return () => {
      controller.abort();
    };
  }, [controller]);

  return [search, searchData];
};
