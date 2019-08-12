import { createSelector } from 'reselect';

const selectFilter = state => state.filter;

export const selectFilterOptions = createSelector(
  [selectFilter],
  filter => filter.options
);

export const selectCurrentFilter = createSelector(
  [selectFilter],
  filter => filter.currentFilter
);
