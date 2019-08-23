import React, { createContext, useEffect, useState, useCallback } from 'react';

import { sortAlpha, populateFilter, applyFilter } from './filter.utils';
import FILTERS from '../../data/vault_filters';

const INITIAL_CONTEXT = {
  itemsListFiltered: [],
  currentFilter: {}
};

export const FilterContext = createContext(INITIAL_CONTEXT);

const FilterProvider = ({ itemsList, children }) => {
  const [itemsListFiltered, setItemsListFiltered] = useState(
    INITIAL_CONTEXT.itemsListFiltered
  );

  const [currentFilter, setCurrentFilter] = useState(
    INITIAL_CONTEXT.currentFilter
  );

  const filterItems = items => setItemsListFiltered(sortAlpha(items));

  const updateFilter = useCallback(
    (filter => (category, item, status) => {
      const categoryObject = filter[category];
      const itemObject = categoryObject[item];
      const newFilter = {
        ...filter,
        [category]: { ...categoryObject, [item]: { ...itemObject, status } }
      };
      setCurrentFilter(newFilter);
    })(currentFilter),
    []
  );

  const loadFilter = () => {
    setCurrentFilter(populateFilter(FILTERS));
  };

  useEffect(() => {
    filterItems(itemsList);
  }, [itemsList]);

  useEffect(loadFilter, []);

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
