import { createSelector } from 'reselect';

const selectFilter = state => state.filter;

export const selectCurrentFilter = createSelector(
  [selectFilter],
  filter => filter.currentFilter
);

export const selectFilteredGames = createSelector(
  [selectFilter],
  filter => filter.filteredGames
);
