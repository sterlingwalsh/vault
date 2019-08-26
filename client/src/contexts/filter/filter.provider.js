import React, { createContext, useEffect, useState, useCallback } from 'react';

import { sortAlpha, populateFilter, applyFilter } from './filter.utils';
import FILTERS from '../../data/vault_filters';

export const FilterContext = createContext();

const FilterProvider = ({ itemsList, children }) => {
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

  return (
    <FilterContext.Provider
      value={{
        itemsListFiltered,
        updateFilter,
        currentFilter
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};

export default FilterProvider;
