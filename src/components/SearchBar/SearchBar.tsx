import { ChangeEvent, useContext, useRef } from "react";

import "./styles.css";
import { PlacesContext } from "../../context";
import { SearchResults } from "..";

export const SearchBar = () => {
  const debounceRef = useRef<number>();
  const { searchPlaces } = useContext(PlacesContext);

  const onQueryChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(() => {
      searchPlaces(event.target.value);
    }, 350);
  };

  return (
    <div className="search__container">
      <input
        type="search"
        className="search__input"
        placeholder="Search for a location"
        onChange={onQueryChange}
      />
      <SearchResults />
    </div>
  );
};
