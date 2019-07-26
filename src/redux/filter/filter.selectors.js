import { createSelector } from 'reselect';

const selectFilter = state => state.filter;

export const selectFilterOptions = createSelector(
  [selectFilter],
  filter => filter.options
);

export const selectFilterSelections = createSelector(
  [selectFilter],
  filter => filter.selections
);
