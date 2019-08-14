import React, { createContext, useEffect, useState } from 'react';

import { sortAlpha, populateFilter } from './filter.utils';
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

  const updateFilter = (filter => (category, item, status) => {
    const newFilter = {
      ...filter,
      [category]: { ...filter[category], [item]: status }
    };
    setCurrentFilter(newFilter);
  })(currentFilter);

  console.log(currentFilter);

  const loadFilter = () => {
    setCurrentFilter(populateFilter(FILTERS));
  };

  useEffect(() => {
    filterItems(itemsList);
  }, [itemsList]);

  useEffect(loadFilter, []);

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
