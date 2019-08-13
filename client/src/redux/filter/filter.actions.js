import FILTER_TYPES from './filter.types';

export const changeFilter = selection => ({
  type: FILTER_TYPES.CHANGE_FILTER,
  payload: selection
});
