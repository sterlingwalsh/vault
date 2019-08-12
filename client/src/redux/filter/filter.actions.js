import FilterActionTypes from './filter.types';

export const changeFilter = selection => ({
  type: FilterActionTypes.changeFilter,
  payload: selection
});
