import React, {
  createContext,
  useEffect,
  useState,
  useCallback,
  useContext
} from "react";

import { sortAlpha, populateFilter, applyFilter } from "./filter.utils";
import FILTERS from "../../data/vault_filters";

import Logger from "../../deep equality logger/context-logger";

export const FilterContext = createContext();

export const useFilter = () => useContext(FilterContext);

export const FilterProvider = ({ itemsList, children }) => {
  const value = useFilterValues(itemsList);

  return (
    <FilterContext.Provider value={value}>
      <Logger title={"Filter"} context={FilterContext} />
      {children}
    </FilterContext.Provider>
  );
};

const useFilterValues = itemsList => {
  const [itemsListFiltered, setItemsListFiltered] = useState([]);

  const [currentFilter, setCurrentFilter] = useState({});

  const updateFilter = useCallback(
    (category, item, status) => {
      if (!category || !item) return;
      const categoryObject = currentFilter[category];
      const itemObject = categoryObject[item];
      const newFilter = {
        ...currentFilter,
        [category]: { ...categoryObject, [item]: { ...itemObject, status } }
      };
      setCurrentFilter(newFilter);
    },
    [currentFilter]
  );

  useEffect(() => {
    setCurrentFilter(populateFilter(FILTERS));
  }, []);

  useEffect(() => {
    setItemsListFiltered(sortAlpha(itemsList));
  }, [itemsList]);

  useEffect(() => {
    setItemsListFiltered(applyFilter(itemsList, currentFilter));
  }, [itemsList, currentFilter]);

  return {
    itemsListFiltered,
    updateFilter,
    currentFilter
  };
};

export default FilterProvider;
